import { courses } from "@/lib/courses";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Clock, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Courses() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-heading font-black text-foreground mb-3">
              Our <span className="text-primary">Programmes</span>
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our range of NTA-accredited vocational training programmes. All programmes include practical, hands-on training.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {courses.map((course) => (
              <div key={course.id} className="bg-card rounded-xl overflow-hidden card-shadow hover:card-elevated transition-all group flex flex-col sm:flex-row">
                <div className="sm:w-56 h-48 sm:h-auto overflow-hidden shrink-0">
                  <img src={course.image} alt={course.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <span className="text-xs font-semibold text-primary bg-accent px-3 py-1 rounded-full">{course.level}</span>
                    <h3 className="font-heading font-bold text-xl mt-3 text-card-foreground">{course.name}</h3>
                    <p className="text-sm text-muted-foreground mt-2">{course.description}</p>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1"><Clock size={14} /> {course.duration}</span>
                      <span className="flex items-center gap-1"><Award size={14} /> NTA Accredited</span>
                    </div>
                    <Button asChild size="sm" className="gradient-primary text-primary-foreground font-semibold">
                      <Link to="/apply">Apply</Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Requirements */}
          <div className="mt-16 bg-card rounded-xl p-8 card-shadow">
            <h2 className="text-2xl font-heading font-bold text-foreground mb-6">Minimum Entry Requirements</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-accent rounded-lg p-5">
                <h3 className="font-heading font-semibold text-accent-foreground mb-2">Technical Programmes</h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• 23 points in six (6) subjects in Grade 10 (Old Curriculum) with E symbol in English, Mathematics and Physical Science</li>
                  <li>• Minimum 20 points in six (6) subjects in Grade 11 (New Curriculum) & Grade 12 with F symbol in English, Mathematics and Science</li>
                </ul>
              </div>
              <div className="bg-accent rounded-lg p-5">
                <h3 className="font-heading font-semibold text-accent-foreground mb-2">Office Administration</h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Minimum 20 points in 6 subjects in Grade 11 (New Curriculum) or Grade 12 with E symbol in English</li>
                  <li>• Level 4 Certificate is required if applying for National Diploma Level 5</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
