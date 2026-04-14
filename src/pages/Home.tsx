import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { courses } from "@/lib/courses";
import assessmentImg from "@/assets/assessment.jpg";
import studentsImg from "@/assets/students.jpg";
import graduationImg from "@/assets/graduation.jpg";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { GraduationCap, Users, Award, BookOpen } from "lucide-react";

const slides = [
  {
    image: studentsImg,
    title: "Welcome to RVTC",
    subtitle: "Empowering Namibian Youth with Practical Skills for a Brighter Future",
  },
  {
    image: assessmentImg,
    title: "Excellence in Vocational Training",
    subtitle: "Accredited programmes designed to prepare you for the workforce",
  },
  {
    image: graduationImg,
    title: "Your Future Starts Here",
    subtitle: "Join hundreds of graduates who have built successful careers through RVTC",
  },
];

const stats = [
  { icon: GraduationCap, value: "500+", label: "Graduates Yearly" },
  { icon: Users, value: "1200+", label: "Current Students" },
  { icon: Award, value: "10", label: "Programmes Offered" },
  { icon: BookOpen, value: "30+", label: "Years of Excellence" },
];

export default function Home() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
  const next = () => setCurrent((c) => (c + 1) % slides.length);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Slider */}
      <section className="relative h-[75vh] min-h-[500px] mt-16 overflow-hidden">
        {slides.map((slide, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === current ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
            <div className="hero-overlay" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center px-4 max-w-3xl slide-enter">
                <h1 className="text-4xl md:text-6xl font-heading font-black text-primary-foreground mb-4 drop-shadow-lg">
                  {slide.title}
                </h1>
                <p className="text-lg md:text-xl text-primary-foreground/90 mb-8">{slide.subtitle}</p>
                <div className="flex gap-4 justify-center flex-wrap">
                  <Button asChild size="lg" className="gradient-accent text-secondary-foreground font-bold text-base px-8 hover:opacity-90">
                    <Link to="/apply">Apply Now</Link>
                  </Button>
                  <Button asChild size="lg" className="gradient-primary text-primary-foreground font-bold text-base px-8 hover:opacity-90">
                    <Link to="/courses">View Courses</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}

        <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 bg-primary-foreground/20 hover:bg-primary-foreground/30 backdrop-blur-sm text-primary-foreground p-2 rounded-full transition">
          <ChevronLeft size={24} />
        </button>
        <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 bg-primary-foreground/20 hover:bg-primary-foreground/30 backdrop-blur-sm text-primary-foreground p-2 rounded-full transition">
          <ChevronRight size={24} />
        </button>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-3 h-3 rounded-full transition-all ${
                i === current ? "bg-secondary w-8" : "bg-primary-foreground/40"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="gradient-primary py-12">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div key={i} className="text-center text-primary-foreground">
              <s.icon size={36} className="mx-auto mb-2 text-secondary" />
              <p className="text-3xl font-heading font-bold">{s.value}</p>
              <p className="text-sm text-primary-foreground/70">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Courses */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-3">
              Our <span className="text-primary">Programmes</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose from 10 accredited vocational programmes designed to equip you with industry-ready skills.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.slice(0, 6).map((course) => (
              <div key={course.id} className="bg-card rounded-lg overflow-hidden card-shadow hover:card-elevated transition-shadow group">
                <div className="h-48 overflow-hidden">
                  <img src={course.image} alt={course.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
                <div className="p-5">
                  <span className="text-xs font-semibold text-primary bg-accent px-2 py-1 rounded-full">{course.level}</span>
                  <h3 className="font-heading font-bold text-lg mt-2 text-card-foreground">{course.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{course.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button asChild size="lg" className="gradient-primary text-primary-foreground font-bold">
              <Link to="/courses">View All Courses</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-foreground mb-4">
            Ready to Build Your Future?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
            Applications for the January 2026 academic year are now open. Don't miss this opportunity!
          </p>
          <Button asChild size="lg" className="gradient-accent text-secondary-foreground font-bold text-lg px-10 hover:opacity-90">
            <Link to="/apply">Start Your Application</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
