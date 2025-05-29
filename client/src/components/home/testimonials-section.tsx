import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useLanguage } from "@/hooks/use-language";

// Define testimonial data structure
type Testimonial = {
  id: number;
  name: string;
  role: string;
  comment: {
    en: string;
    pl: string;
  };
  rating: number;
  initials: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Robert Brown",
    role: "Gamer & Streamer",
    comment: {
      en: "\"I found my dream gaming setup within 48 hours of posting my ad. Got multiple offers and was able to negotiate a great price!\"",
      pl: "\"Znalazłem wymarzony zestaw gamingowy w ciągu 48 godzin od zamieszczenia ogłoszenia. Otrzymałem wiele ofert i mogłem wynegocjować świetną cenę!\""
    },
    rating: 5,
    initials: "RB",
  },
  {
    id: 2,
    name: "Emily Wilson",
    role: "First-time Parent",
    comment: {
      en: "\"As a new parent, I needed baby furniture on a budget. JaKupie connected me with sellers who had exactly what I needed. Saved hundreds!\"",
      pl: "\"Jako nowy rodzic, potrzebowałam mebli dziecięcych w niewielkim budżecie. JaKupie połączyło mnie ze sprzedawcami, którzy mieli dokładnie to, czego potrzebowałam. Zaoszczędziłam setki!\""
    },
    rating: 5,
    initials: "EW",
  },
  {
    id: 3,
    name: "David Thompson",
    role: "Photography Enthusiast",
    comment: {
      en: "\"I was looking for a specific vintage camera model for months. Posted on JaKupie and had three sellers contact me within a week. Amazing service!\"",
      pl: "\"Szukałem konkretnego modelu zabytkowego aparatu przez miesiące. Zamieściłem ogłoszenie na JaKupie i w ciągu tygodnia skontaktowało się ze mną trzech sprzedawców. Niesamowita usługa!\""
    },
    rating: 4.5,
    initials: "DT",
  },
];

export default function TestimonialsSection() {
  const { t, language } = useLanguage();

  // Function to render stars based on rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={`full-${i}`} className="fas fa-star"></i>);
    }

    // Add half star if needed
    if (hasHalfStar) {
      stars.push(<i key="half" className="fas fa-star-half-alt"></i>);
    }

    // Add empty stars to fill to 5
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="far fa-star"></i>);
    }

    return stars;
  };

  // Get the appropriate comment based on the current language
  const getComment = (comment: { en: string; pl: string }) => {
    return language === 'pl' ? comment.pl : comment.en;
  };

  return (
    <section className="py-16 bg-white dark:bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12 dark:text-white">{t("testimonials.title")}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-gray-50 dark:bg-gray-800 border-0">
              <CardContent className="p-6">
                <div className="flex items-center text-yellow-400 mb-4">
                  {renderStars(testimonial.rating)}
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{getComment(testimonial.comment)}</p>
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 bg-gray-300 dark:bg-gray-600">
                    <AvatarFallback className="text-xs font-medium text-gray-600 dark:text-gray-200">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="ml-3">
                    <h4 className="font-medium text-gray-800 dark:text-gray-200">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
