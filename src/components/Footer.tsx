import { Link } from "react-router-dom";
import logo from "@/assets/rvtc_logo.png";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <img src={logo} alt="RVTC" className="h-14 w-14 rounded-full" />
              <div>
                <h3 className="font-heading font-bold text-lg">RVTC</h3>
                <p className="text-sm text-primary-foreground/70">Rundu Vocational Training Centre</p>
              </div>
            </div>
            <p className="text-sm text-primary-foreground/70 mt-2">
              Empowering Namibian youth with practical skills for a brighter future.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2">
              <Link to="/" className="text-sm text-primary-foreground/70 hover:text-secondary transition-colors">Home</Link>
              <Link to="/courses" className="text-sm text-primary-foreground/70 hover:text-secondary transition-colors">Courses</Link>
              <Link to="/apply" className="text-sm text-primary-foreground/70 hover:text-secondary transition-colors">Apply Now</Link>
              <Link to="/login" className="text-sm text-primary-foreground/70 hover:text-secondary transition-colors">Student Login</Link>
            </div>
          </div>

          <div>
            <h4 className="font-heading font-semibold mb-4">Contact Us</h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-sm text-primary-foreground/70">
                <MapPin size={16} className="text-secondary shrink-0" />
                Private Bag 2081, Rundu, Namibia
              </div>
              <div className="flex items-center gap-2 text-sm text-primary-foreground/70">
                <Phone size={16} className="text-secondary shrink-0" />
                +264 66 269 0000
              </div>
              <div className="flex items-center gap-2 text-sm text-primary-foreground/70">
                <Mail size={16} className="text-secondary shrink-0" />
                info@rvtc.edu.na
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-primary-foreground/10 mt-8 pt-6 text-center text-sm text-primary-foreground/50">
          © {new Date().getFullYear()} Rundu Vocational Training Centre. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
