import { useState, useEffect, useMemo } from "react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import TherapistCard from "@/components/therapist/TherapistCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, Loader2, X } from "lucide-react";
import api from "@/lib/api";

// Define the shape of your Real Backend Data
interface Therapist {
  _id: string;
  name: string;
  email: string;
  role: string;
  sex: string;
  profilePicture?: string;
  school?: string; // We will use this as "Bio" or "Specialty" for now
  isVerified: boolean;
}

const Therapists = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [therapists, setTherapists] = useState<Therapist[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // --- 1. FETCH REAL DATA ---
  useEffect(() => {
    const fetchTherapists = async () => {
      try {
        const { data } = await api.get("/patient/therapists");
        setTherapists(data);
      } catch (error) {
        console.error("Error fetching therapists:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTherapists();
  }, []);

  // --- 2. FILTER LOGIC ---
  const filteredTherapists = useMemo(() => {
    return therapists.filter((therapist) => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        therapist.name.toLowerCase().includes(searchLower) ||
        (therapist.school &&
          therapist.school.toLowerCase().includes(searchLower));

      return matchesSearch;
    });
  }, [searchTerm, therapists]);

  const clearFilters = () => {
    setSearchTerm("");
  };

  return (
    <>
      <Helmet>
        <title>Terapistler - VolunTherapy</title>
        <meta
          name="description"
          content="VolunTherapy'de doğrulanmış gönüllü terapistleri keşfedin."
        />
      </Helmet>

      <Layout>
        <div className="bg-gradient-to-b from-secondary/50 to-background py-12 md:py-16">
          <div className="container-therapeutic">
            {/* Header */}
            <div className="mb-8 text-center">
              <h1 className="section-title mb-4">Terapistlerimiz</h1>
              <p className="section-subtitle mx-auto">
                Doğrulanmış, deneyimli ve gönüllü terapistlerimizle tanışın.
              </p>
            </div>

            {/* Search Only (Since DB doesn't have City/Specialty yet) */}
            <div className="mb-8 rounded-xl bg-card p-4 shadow-soft md:p-6 max-w-2xl mx-auto">
              <div className="flex flex-col gap-4 md:flex-row md:items-end">
                {/* Search Input */}
                <div className="flex-1">
                  <Label htmlFor="search" className="sr-only">
                    Terapist Ara
                  </Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="search"
                      placeholder="İsim veya üniversite ile ara..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Clear Filters */}
                {searchTerm && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="text-muted-foreground"
                  >
                    <X className="mr-1 h-4 w-4" />
                    Temizle
                  </Button>
                )}
              </div>
            </div>

            {/* Results Count */}
            <p className="mb-6 text-sm text-muted-foreground text-center">
              {filteredTherapists.length} doğrulanmış terapist bulundu
            </p>

            {/* Therapist Grid */}
            {isLoading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
              </div>
            ) : filteredTherapists.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredTherapists.map((therapist) => (
                  <TherapistCard
                    key={therapist._id}
                    therapist={
                      {
                        // 1. REAL DATA FROM DB
                        id: therapist._id,
                        name: therapist.name,
                        specialty: therapist.school || "Psikoloji",
                        profilePic:
                          therapist.profilePicture ||
                          "https://i.pravatar.cc/150?img=33",
                        verified: therapist.isVerified,

                        // 2. REQUIRED DUMMY DATA (To prevent crash)
                        bio: "Gönüllü Terapist",
                        city: "Online",
                        rating: 5.0,
                        reviews: 0,
                        experience: "1+ Yıl",
                        languages: ["Türkçe"],
                        price: 0,
                        about: "Gönüllü olarak hizmet vermektedir.",
                        available: {}, // Prevents crash if calendar tries to read this
                      } as any
                    }
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-xl bg-muted/50 py-16 text-center">
                <p className="text-lg text-muted-foreground">
                  Arama kriterlerinize uygun terapist bulunamadı.
                </p>
                <Button
                  variant="therapeutic-secondary"
                  className="mt-4"
                  onClick={clearFilters}
                >
                  Filtreleri Temizle
                </Button>
              </div>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Therapists;
