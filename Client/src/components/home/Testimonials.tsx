import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import mockData from "@/data/mockData.json";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  const testimonials = mockData.comments.slice(0, 10);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(testimonials.length / itemsPerPage);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalPages);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, totalPages]);

  const nextSlide = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const getCurrentItems = () => {
    const start = currentIndex * itemsPerPage;
    return testimonials.slice(start, start + itemsPerPage);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-muted"
        }`}
        aria-hidden="true"
      />
    ));
  };

  return (
    <section 
      className="bg-muted/30 py-16 md:py-24"
      aria-labelledby="testimonials-heading"
    >
      <div className="container-therapeutic">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 
            id="testimonials-heading" 
            className="section-title mb-4"
          >
            Kullanıcılarımız Ne Diyor?
          </h2>
          <p className="section-subtitle mx-auto">
            Binlerce danışanımız VolunTherapy deneyimlerini paylaşıyor.
          </p>
        </div>

        {/* Testimonials Slider */}
        <div className="relative">
          {/* Navigation Buttons */}
          <div className="absolute -left-4 top-1/2 z-10 -translate-y-1/2 md:-left-6">
            <Button
              variant="therapeutic-secondary"
              size="icon"
              onClick={prevSlide}
              aria-label="Önceki yorumlar"
              className="h-10 w-10 rounded-full shadow-medium"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </Button>
          </div>
          <div className="absolute -right-4 top-1/2 z-10 -translate-y-1/2 md:-right-6">
            <Button
              variant="therapeutic-secondary"
              size="icon"
              onClick={nextSlide}
              aria-label="Sonraki yorumlar"
              className="h-10 w-10 rounded-full shadow-medium"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </Button>
          </div>

          {/* Cards Container */}
          <div className="overflow-hidden px-4">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {Array.from({ length: totalPages }).map((_, pageIndex) => (
                <div 
                  key={pageIndex}
                  className="flex min-w-full gap-6"
                >
                  {testimonials
                    .slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage)
                    .map((testimonial) => (
                      <article
                        key={testimonial.id}
                        className="card-therapeutic flex-1 p-6"
                      >
                        <div className="mb-4 flex items-start justify-between">
                          <Quote className="h-8 w-8 text-primary/20" aria-hidden="true" />
                          <div className="flex" aria-label={`${testimonial.rating} yıldız`}>
                            {renderStars(testimonial.rating)}
                          </div>
                        </div>
                        <blockquote className="mb-4 text-foreground">
                          "{testimonial.message}"
                        </blockquote>
                        <footer className="flex items-center justify-between border-t border-border/50 pt-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary font-semibold text-secondary-foreground">
                              {testimonial.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-medium text-foreground">{testimonial.name}</p>
                              <p className="text-sm text-muted-foreground">Danışan</p>
                            </div>
                          </div>
                          <time 
                            dateTime={testimonial.date}
                            className="text-sm text-muted-foreground"
                          >
                            {new Date(testimonial.date).toLocaleDateString("tr-TR", {
                              month: "short",
                              year: "numeric"
                            })}
                          </time>
                        </footer>
                      </article>
                    ))}
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="mt-8 flex justify-center gap-2" role="tablist" aria-label="Yorum sayfaları">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrentIndex(index);
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? "w-8 bg-primary" 
                    : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                role="tab"
                aria-selected={index === currentIndex}
                aria-label={`Sayfa ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
