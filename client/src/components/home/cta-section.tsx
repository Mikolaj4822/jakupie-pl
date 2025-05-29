import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useLanguage } from "@/hooks/use-language";

export default function CtaSection() {
  const { user } = useAuth();
  const { t } = useLanguage();

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-primary to-indigo-700 rounded-2xl p-8 md:p-12">
          <div className="md:flex items-center justify-between">
            <div className="md:w-2/3 mb-6 md:mb-0">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Dołącz do naszej społeczności</h2>
              <p className="text-indigo-100 text-lg">Dołącz do tysięcy zadowolonych użytkowników, którzy znaleźli dokładnie to, czego potrzebowali</p>
            </div>
            <div className="md:w-1/3 flex justify-center md:justify-end">
              <Link href={user ? "/create-ad" : "/auth?tab=register"}>
                <Button variant="secondary" className="px-6 py-3 bg-white text-primary font-semibold hover:bg-gray-100 w-full md:w-auto">
                  Rozpocznij
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
