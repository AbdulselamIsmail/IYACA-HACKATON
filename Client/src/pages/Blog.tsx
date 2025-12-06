import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Calendar, User, Plus, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import mockData from "@/data/mockData.json";

const Blog = () => {
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<typeof mockData.blogPosts[0] | null>(null);

  const handleLike = (postId: string) => {
    setLikedPosts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const handleSubmitPost = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Yazınız başarıyla gönderildi! Moderatör onayından sonra yayınlanacak.");
    setIsWriteModalOpen(false);
  };

  return (
    <>
      <Helmet>
        <title>Blog - VolunTherapy</title>
        <meta
          name="description"
          content="Psikoloji, ruh sağlığı ve kişisel gelişim hakkında faydalı yazılar. Uzmanlardan tavsiyeler."
        />
      </Helmet>

      <Layout>
        <div className="bg-gradient-to-b from-secondary/50 to-background py-12 md:py-16">
          <div className="container-therapeutic">
            {/* Header */}
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="section-title mb-2">Blog</h1>
                <p className="text-muted-foreground">
                  Ruh sağlığı ve kişisel gelişim hakkında faydalı içerikler
                </p>
              </div>
              <Dialog open={isWriteModalOpen} onOpenChange={setIsWriteModalOpen}>
                <DialogTrigger asChild>
                  <Button variant="therapeutic">
                    <Plus className="mr-2 h-4 w-4" />
                    Yazı Paylaş
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg">
                  <DialogHeader>
                    <DialogTitle>Yeni Yazı Paylaş</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmitPost} className="space-y-4">
                    <div>
                      <Label htmlFor="post-title">Başlık</Label>
                      <Input
                        id="post-title"
                        placeholder="Yazınızın başlığı..."
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="post-summary">Özet</Label>
                      <Input
                        id="post-summary"
                        placeholder="Kısa bir özet..."
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="post-content">İçerik</Label>
                      <Textarea
                        id="post-content"
                        placeholder="Yazınızın içeriği..."
                        rows={6}
                        required
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => setIsWriteModalOpen(false)}
                      >
                        İptal
                      </Button>
                      <Button type="submit" variant="therapeutic">
                        Gönder
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {/* Blog Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {mockData.blogPosts.map((post) => (
                <article
                  key={post.id}
                  className="card-therapeutic group overflow-hidden transition-all duration-300 hover:shadow-large"
                >
                  <div className="p-6">
                    {/* Author & Date */}
                    <div className="mb-4 flex items-center justify-between text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {post.author}
                      </span>
                      <time dateTime={post.date} className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {new Date(post.date).toLocaleDateString("tr-TR", {
                          day: "numeric",
                          month: "short",
                        })}
                      </time>
                    </div>

                    {/* Title & Summary */}
                    <h2 className="mb-2 text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
                      {post.summary}
                    </p>

                    {/* Actions */}
                    <div className="flex items-center justify-between border-t border-border/50 pt-4">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => handleLike(post.id)}
                          className={`flex items-center gap-1 text-sm transition-colors ${
                            likedPosts.has(post.id)
                              ? "text-red-500"
                              : "text-muted-foreground hover:text-red-500"
                          }`}
                          aria-label={likedPosts.has(post.id) ? "Beğeniyi kaldır" : "Beğen"}
                        >
                          <Heart
                            className={`h-4 w-4 ${
                              likedPosts.has(post.id) ? "fill-current" : ""
                            }`}
                          />
                          {post.likes + (likedPosts.has(post.id) ? 1 : 0)}
                        </button>
                        <button
                          onClick={() => setSelectedPost(post)}
                          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
                          aria-label="Yorumları gör"
                        >
                          <MessageCircle className="h-4 w-4" />
                          {post.comments.length}
                        </button>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedPost(post)}
                      >
                        Devamını Oku
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Post Detail Modal */}
            <Dialog open={!!selectedPost} onOpenChange={() => setSelectedPost(null)}>
              <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-2xl">
                {selectedPost && (
                  <>
                    <DialogHeader>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <User className="h-4 w-4" />
                        {selectedPost.author}
                        <span>•</span>
                        <Calendar className="h-4 w-4" />
                        {new Date(selectedPost.date).toLocaleDateString("tr-TR")}
                      </div>
                      <DialogTitle className="text-xl">
                        {selectedPost.title}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <p className="text-muted-foreground whitespace-pre-line">
                        {selectedPost.content}
                      </p>

                      {/* Comments */}
                      <div className="border-t border-border pt-4">
                        <h3 className="mb-4 font-semibold text-foreground">
                          Yorumlar ({selectedPost.comments.length})
                        </h3>
                        {selectedPost.comments.length > 0 ? (
                          <div className="space-y-3">
                            {selectedPost.comments.map((comment) => (
                              <div
                                key={comment.id}
                                className="rounded-lg bg-muted/50 p-3"
                              >
                                <div className="mb-1 flex items-center justify-between">
                                  <span className="text-sm font-medium">
                                    {comment.author}
                                  </span>
                                  <span className="text-xs text-muted-foreground">
                                    {new Date(comment.date).toLocaleDateString("tr-TR")}
                                  </span>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  {comment.text}
                                </p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground">
                            Henüz yorum yapılmamış. İlk yorumu siz yapın!
                          </p>
                        )}

                        {/* Add Comment */}
                        <div className="mt-4">
                          <Textarea
                            placeholder="Yorumunuzu yazın..."
                            rows={2}
                          />
                          <Button
                            variant="therapeutic"
                            size="sm"
                            className="mt-2"
                            onClick={() => {
                              toast.success("Yorumunuz gönderildi!");
                            }}
                          >
                            Yorum Yap
                          </Button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Blog;
