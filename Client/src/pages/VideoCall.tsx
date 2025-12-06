import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  Phone,
  MessageCircle,
  FileText,
  Send,
  ArrowLeft,
  Clock,
  User,
} from "lucide-react";
import { toast } from "sonner";
import mockData from "@/data/mockData.json";

const VideoCall = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [notes, setNotes] = useState("");
  const [sessionTime, setSessionTime] = useState(0);
  const [chatMessages, setChatMessages] = useState<
    { sender: string; message: string; time: string }[]
  >([
    {
      sender: "Terapist",
      message: "Merhaba, görüşmeye hoş geldiniz. Kendinizi rahat hissedin.",
      time: "14:00",
    },
  ]);

  const therapist = mockData.therapists[0];

  // Session timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSessionTime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSendMessage = () => {
    if (!chatMessage.trim()) return;
    setChatMessages([
      ...chatMessages,
      {
        sender: "Siz",
        message: chatMessage,
        time: new Date().toLocaleTimeString("tr-TR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      },
    ]);
    setChatMessage("");
  };

  const handleEndCall = () => {
    toast.info("Görüşme sonlandırıldı. Değerlendirme için yönlendiriliyorsunuz.");
  };

  // Session progress (50 min session)
  const sessionDuration = 50 * 60; // 50 minutes in seconds
  const progressPercent = Math.min((sessionTime / sessionDuration) * 100, 100);

  return (
    <>
      <Helmet>
        <title>Görüntülü Görüşme - VolunTherapy</title>
      </Helmet>

      <div className="flex h-screen flex-col bg-foreground">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-border/20 bg-card/5 px-4 py-3 backdrop-blur">
          <Link
            to="/dashboard/client"
            className="flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Panele Dön
          </Link>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-full bg-primary/20 px-4 py-1.5">
              <Clock className="h-4 w-4 text-primary-foreground" />
              <span className="font-mono text-sm text-primary-foreground">
                {formatTime(sessionTime)}
              </span>
            </div>
            <div className="text-sm text-primary-foreground/70">
              {therapist.name} ile görüşme
            </div>
          </div>

          <Button
            variant="destructive"
            size="sm"
            onClick={handleEndCall}
            asChild
          >
            <Link to="/dashboard/client">
              <Phone className="mr-2 h-4 w-4" />
              Görüşmeyi Bitir
            </Link>
          </Button>
        </header>

        {/* Session Progress Bar */}
        <div className="h-1 bg-muted/20">
          <div
            className="h-full bg-primary transition-all duration-1000"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Main Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Video Area */}
          <div className="relative flex flex-1 flex-col">
            {/* Main Video (Therapist) */}
            <div className="relative flex-1 bg-gradient-to-br from-muted/20 to-muted/10">
              {/* Placeholder for therapist video */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto mb-4 flex h-32 w-32 items-center justify-center rounded-full bg-secondary/20">
                    <img
                      src={therapist.profilePic}
                      alt={therapist.name}
                      className="h-28 w-28 rounded-full object-cover"
                    />
                  </div>
                  <p className="text-lg font-medium text-primary-foreground">
                    {therapist.name}
                  </p>
                  <p className="text-sm text-primary-foreground/70">
                    {therapist.specialty}
                  </p>
                  <p className="mt-4 text-xs text-primary-foreground/50">
                    WebRTC video placeholder - Gerçek entegrasyon backend gerektirir
                  </p>
                </div>
              </div>

              {/* Self Video (Small) */}
              <div className="absolute bottom-4 right-4 h-32 w-44 overflow-hidden rounded-xl border-2 border-border/30 bg-muted/30 shadow-large">
                <div className="flex h-full items-center justify-center">
                  {isVideoOff ? (
                    <VideoOff className="h-8 w-8 text-primary-foreground/50" />
                  ) : (
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary/30">
                      <User className="h-8 w-8 text-primary-foreground/70" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 bg-card/10 py-4 backdrop-blur">
              <Button
                variant={isMuted ? "destructive" : "secondary"}
                size="lg"
                className="h-14 w-14 rounded-full"
                onClick={() => setIsMuted(!isMuted)}
                aria-label={isMuted ? "Mikrofonu aç" : "Mikrofonu kapat"}
              >
                {isMuted ? (
                  <MicOff className="h-6 w-6" />
                ) : (
                  <Mic className="h-6 w-6" />
                )}
              </Button>

              <Button
                variant={isVideoOff ? "destructive" : "secondary"}
                size="lg"
                className="h-14 w-14 rounded-full"
                onClick={() => setIsVideoOff(!isVideoOff)}
                aria-label={isVideoOff ? "Kamerayı aç" : "Kamerayı kapat"}
              >
                {isVideoOff ? (
                  <VideoOff className="h-6 w-6" />
                ) : (
                  <Video className="h-6 w-6" />
                )}
              </Button>

              <Button
                variant={showChat ? "default" : "secondary"}
                size="lg"
                className="h-14 w-14 rounded-full"
                onClick={() => {
                  setShowChat(!showChat);
                  setShowNotes(false);
                }}
                aria-label="Sohbet"
              >
                <MessageCircle className="h-6 w-6" />
              </Button>

              <Button
                variant={showNotes ? "default" : "secondary"}
                size="lg"
                className="h-14 w-14 rounded-full"
                onClick={() => {
                  setShowNotes(!showNotes);
                  setShowChat(false);
                }}
                aria-label="Notlar"
              >
                <FileText className="h-6 w-6" />
              </Button>
            </div>
          </div>

          {/* Side Panel - Chat */}
          {showChat && (
            <div className="flex w-80 flex-col border-l border-border/20 bg-card/5 backdrop-blur">
              <div className="border-b border-border/20 p-4">
                <h3 className="font-semibold text-primary-foreground">Sohbet</h3>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {chatMessages.map((msg, index) => (
                  <div
                    key={index}
                    className={`rounded-lg p-3 ${
                      msg.sender === "Siz"
                        ? "ml-8 bg-primary text-primary-foreground"
                        : "mr-8 bg-muted/30 text-primary-foreground"
                    }`}
                  >
                    <p className="text-xs font-medium opacity-70">{msg.sender}</p>
                    <p className="text-sm">{msg.message}</p>
                    <p className="mt-1 text-xs opacity-50">{msg.time}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-border/20 p-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Mesaj yazın..."
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                    className="bg-muted/20 border-border/30 text-primary-foreground placeholder:text-primary-foreground/50"
                  />
                  <Button size="icon" onClick={handleSendMessage}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Side Panel - Notes */}
          {showNotes && (
            <div className="flex w-80 flex-col border-l border-border/20 bg-card/5 backdrop-blur">
              <div className="border-b border-border/20 p-4">
                <h3 className="font-semibold text-primary-foreground">Notlar</h3>
                <p className="text-xs text-primary-foreground/70">
                  Bu notlar sadece size özeldir
                </p>
              </div>
              <div className="flex-1 p-4">
                <Textarea
                  placeholder="Seans notlarınızı buraya yazabilirsiniz..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="h-full resize-none bg-muted/20 border-border/30 text-primary-foreground placeholder:text-primary-foreground/50"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default VideoCall;
