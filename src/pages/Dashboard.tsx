import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth-context";
import logo from "@/assets/rvtc_logo.png";
import {
  LayoutDashboard, FileText, BookOpen, Bell, User, HelpCircle,
  GraduationCap, LogOut, Menu, X, ChevronRight, Edit, CheckCircle,
  Clock, AlertCircle, Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { courses } from "@/lib/courses";

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "application", label: "Applications", icon: FileText },
  { id: "courses", label: "Student Courses", icon: BookOpen },
  { id: "announcements", label: "Announcements", icon: Bell },
  { id: "profile", label: "Student Admin", icon: User },
  { id: "enquiry", label: "Student Enquiry", icon: HelpCircle },
  { id: "academics", label: "Academic Records", icon: GraduationCap },
  { id: "settings", label: "Settings", icon: Settings },
];

const announcements = [
  { id: 1, title: "Welcome to RVTC 2026 Academic Year", date: "2026-01-15", content: "We are pleased to welcome all new and returning students." },
  { id: 2, title: "Aptitude Test Schedule", date: "2026-01-20", content: "Aptitude tests for new applicants will be held on 28 January 2026." },
  { id: 3, title: "Hostel Registration Open", date: "2026-01-18", content: "Students requiring hostel accommodation should register at the admin office." },
  { id: 4, title: "Library Hours Extended", date: "2026-02-01", content: "The library will now be open until 20:00 on weekdays." },
];

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!user) {
    navigate("/login");
    return null;
  }

  const appData = user.applicationData;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-foreground/30 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-sidebar text-sidebar-foreground transform transition-transform lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={logo} alt="RVTC" className="h-10 w-10 rounded-full" />
              <div>
                <h2 className="font-heading font-bold text-sm text-sidebar-foreground">RVTC Portal</h2>
                <p className="text-xs text-sidebar-foreground/60">Student Dashboard</p>
              </div>
            </div>
            <button className="lg:hidden text-sidebar-foreground" onClick={() => setSidebarOpen(false)}>
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="p-4 border-b border-sidebar-border">
          <div className="bg-sidebar-accent rounded-lg p-3">
            <p className="text-xs text-sidebar-foreground/60">Student Number</p>
            <p className="font-heading font-bold text-sidebar-primary text-lg">{user.studentNumber}</p>
            <p className="text-xs text-sidebar-foreground/60 mt-1">{user.email}</p>
          </div>
        </div>

        <nav className="p-3 space-y-1 flex-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeTab === item.id
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-sidebar-border">
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-sidebar-foreground/70 hover:bg-destructive/10 hover:text-destructive transition-colors">
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-h-screen">
        {/* Top bar */}
        <header className="bg-card border-b border-border px-4 py-3 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button className="lg:hidden text-foreground" onClick={() => setSidebarOpen(true)}>
              <Menu size={24} />
            </button>
            <h2 className="font-heading font-bold text-lg text-foreground capitalize">{activeTab}</h2>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-semibold text-foreground">{appData?.firstNames} {appData?.surname}</p>
              <p className="text-xs text-muted-foreground">Student No: {user.studentNumber}</p>
            </div>
            <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
              {(appData?.firstNames?.[0] || user.email[0]).toUpperCase()}
            </div>
          </div>
        </header>

        <div className="p-4 md:p-6">
          {/* Dashboard Tab */}
          {activeTab === "dashboard" && (
            <div className="space-y-6 slide-enter">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard icon={FileText} label="Application Status" value={user.applicationStatus} color="primary" />
                <StatCard icon={GraduationCap} label="Student Number" value={user.studentNumber} color="secondary" />
                <StatCard icon={BookOpen} label="Programme" value={appData?.firstChoice || "Pending"} color="info" />
                <StatCard icon={Clock} label="Academic Year" value="2026" color="success" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-card rounded-xl p-6 card-shadow">
                  <h3 className="font-heading font-bold text-foreground mb-4">Application Summary</h3>
                  <div className="space-y-3">
                    <InfoRow label="Full Name" value={`${appData?.firstNames || "N/A"} ${appData?.surname || ""}`} />
                    <InfoRow label="ID Number" value={appData?.idNumber || "N/A"} />
                    <InfoRow label="Email" value={user.email} />
                    <InfoRow label="Phone" value={appData?.cellPhone || "N/A"} />
                    <InfoRow label="1st Choice" value={appData?.firstChoice || "N/A"} />
                    <InfoRow label="2nd Choice" value={appData?.secondChoice || "N/A"} />
                    <InfoRow label="Region" value={appData?.region || "N/A"} />
                  </div>
                </div>

                <div className="bg-card rounded-xl p-6 card-shadow">
                  <h3 className="font-heading font-bold text-foreground mb-4">Application Progress</h3>
                  <div className="space-y-4">
                    <ProgressItem label="Application Submitted" done />
                    <ProgressItem label="Documents Verified" done />
                    <ProgressItem label="Under Review" active />
                    <ProgressItem label="Aptitude Test" />
                    <ProgressItem label="Admission Decision" />
                  </div>
                </div>
              </div>

              <div className="bg-card rounded-xl p-6 card-shadow">
                <h3 className="font-heading font-bold text-foreground mb-4">Recent Announcements</h3>
                <div className="space-y-3">
                  {announcements.slice(0, 3).map(a => (
                    <div key={a.id} className="flex items-start gap-3 p-3 bg-accent rounded-lg">
                      <Bell size={18} className="text-primary mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-foreground">{a.title}</p>
                        <p className="text-xs text-muted-foreground">{a.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Application Tab */}
          {activeTab === "application" && (
            <div className="space-y-6 slide-enter">
              <div className="bg-card rounded-xl p-6 card-shadow">
                <h3 className="font-heading font-bold text-foreground mb-4">Application Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoRow label="Application Status" value={user.applicationStatus} />
                  <InfoRow label="Student Number" value={user.studentNumber} />
                  <InfoRow label="Full Name" value={`${appData?.firstNames || ""} ${appData?.surname || ""}`} />
                  <InfoRow label="ID Number" value={appData?.idNumber || "N/A"} />
                  <InfoRow label="Date of Birth" value={appData?.dateOfBirth || "N/A"} />
                  <InfoRow label="Gender" value={appData?.gender || "N/A"} />
                  <InfoRow label="Nationality" value={appData?.nationality || "N/A"} />
                  <InfoRow label="Cell Phone" value={appData?.cellPhone || "N/A"} />
                  <InfoRow label="Email" value={user.email} />
                  <InfoRow label="Postal Address" value={appData?.postalAddress || "N/A"} />
                  <InfoRow label="Region" value={appData?.region || "N/A"} />
                  <InfoRow label="Hostel Required" value={appData?.hostelAccommodation || "N/A"} />
                  <InfoRow label="1st Choice Programme" value={appData?.firstChoice || "N/A"} />
                  <InfoRow label="2nd Choice Programme" value={appData?.secondChoice || "N/A"} />
                  <InfoRow label="School Attended" value={appData?.schoolAttended || "N/A"} />
                  <InfoRow label="Highest Grade" value={appData?.highestGrade || "N/A"} />
                </div>
              </div>

              <div className="bg-card rounded-xl p-6 card-shadow">
                <h3 className="font-heading font-bold text-foreground mb-4">Emergency Contact</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InfoRow label="Name" value={appData?.emergencyName || "N/A"} />
                  <InfoRow label="Cell Phone" value={appData?.emergencyCell || "N/A"} />
                  <InfoRow label="Relationship" value={appData?.emergencyRelationship || "N/A"} />
                  <InfoRow label="Social Status" value={appData?.emergencySocialStatus || "N/A"} />
                </div>
              </div>

              <div className="bg-card rounded-xl p-6 card-shadow">
                <h3 className="font-heading font-bold text-foreground mb-4">Uploaded Documents</h3>
                {user.documents.length > 0 ? (
                  <div className="space-y-2">
                    {user.documents.map((d, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-accent rounded-lg">
                        <FileText size={18} className="text-primary" />
                        <span className="text-sm text-foreground">{d}</span>
                        <CheckCircle size={16} className="text-success ml-auto" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No documents uploaded yet.</p>
                )}
              </div>
            </div>
          )}

          {/* Courses Tab */}
          {activeTab === "courses" && (
            <div className="space-y-6 slide-enter">
              <div className="bg-card rounded-xl p-6 card-shadow">
                <h3 className="font-heading font-bold text-foreground mb-2">Enrolled Programme</h3>
                <p className="text-muted-foreground text-sm mb-4">Your selected programme based on your application.</p>
                {appData?.firstChoice ? (
                  <div className="bg-accent rounded-lg p-4">
                    <p className="font-heading font-bold text-lg text-foreground">{appData.firstChoice}</p>
                    <p className="text-sm text-muted-foreground mt-1">Status: Pending Admission</p>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No programme selected yet.</p>
                )}
              </div>
              <div className="bg-card rounded-xl p-6 card-shadow">
                <h3 className="font-heading font-bold text-foreground mb-4">Available Programmes</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {courses.map(c => (
                    <div key={c.id} className="flex items-center gap-3 p-3 bg-accent rounded-lg">
                      <img src={c.image} alt={c.name} className="w-12 h-12 rounded-lg object-cover" />
                      <div>
                        <p className="text-sm font-semibold text-foreground">{c.name}</p>
                        <p className="text-xs text-muted-foreground">{c.level} • {c.duration}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Announcements Tab */}
          {activeTab === "announcements" && (
            <div className="space-y-4 slide-enter">
              {announcements.map(a => (
                <div key={a.id} className="bg-card rounded-xl p-6 card-shadow">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground shrink-0">
                      <Bell size={18} />
                    </div>
                    <div>
                      <h3 className="font-heading font-bold text-foreground">{a.title}</h3>
                      <p className="text-xs text-muted-foreground mb-2">{a.date}</p>
                      <p className="text-sm text-muted-foreground">{a.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Profile/Student Admin Tab */}
          {activeTab === "profile" && (
            <div className="space-y-6 slide-enter">
              <div className="bg-card rounded-xl p-6 card-shadow">
                <h3 className="font-heading font-bold text-foreground mb-4">Edit Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><Label>First Name(s)</Label><Input defaultValue={appData?.firstNames} /></div>
                  <div><Label>Surname</Label><Input defaultValue={appData?.surname} /></div>
                  <div><Label>Email</Label><Input defaultValue={user.email} /></div>
                  <div><Label>Cell Phone</Label><Input defaultValue={appData?.cellPhone} /></div>
                  <div><Label>Physical Address</Label><Input defaultValue={appData?.physicalAddress} /></div>
                  <div><Label>Town</Label><Input defaultValue={appData?.town} /></div>
                </div>
                <Button className="mt-4 gradient-primary text-primary-foreground font-semibold gap-2">
                  <Edit size={16} /> Save Changes
                </Button>
              </div>
            </div>
          )}

          {/* Enquiry Tab */}
          {activeTab === "enquiry" && (
            <div className="space-y-6 slide-enter">
              <div className="bg-card rounded-xl p-6 card-shadow">
                <h3 className="font-heading font-bold text-foreground mb-4">Submit an Enquiry</h3>
                <div className="space-y-4 max-w-lg">
                  <div><Label>Subject</Label><Input placeholder="Enter subject" /></div>
                  <div><Label>Message</Label><textarea className="w-full min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="Describe your enquiry..." /></div>
                  <Button className="gradient-primary text-primary-foreground font-semibold">Submit Enquiry</Button>
                </div>
              </div>
            </div>
          )}

          {/* Academics Tab */}
          {activeTab === "academics" && (
            <div className="slide-enter">
              <div className="bg-card rounded-xl p-6 card-shadow">
                <h3 className="font-heading font-bold text-foreground mb-4">Academic Records</h3>
                <div className="text-center py-10">
                  <GraduationCap size={48} className="mx-auto text-muted-foreground mb-3" />
                  <p className="text-muted-foreground">Academic records will be available once you are enrolled.</p>
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <div className="space-y-6 slide-enter">
              <div className="bg-card rounded-xl p-6 card-shadow">
                <h3 className="font-heading font-bold text-foreground mb-4">Account Settings</h3>
                <div className="space-y-4 max-w-md">
                  <div><Label>Email</Label><Input defaultValue={user.email} /></div>
                  <div><Label>New Password</Label><Input type="password" placeholder="Enter new password" /></div>
                  <Button className="gradient-primary text-primary-foreground font-semibold">Update Settings</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color }: { icon: any; label: string; value: string; color: string }) {
  const colorMap: Record<string, string> = {
    primary: "text-primary bg-accent",
    secondary: "text-secondary bg-secondary/10",
    info: "text-info bg-info/10",
    success: "text-success bg-success/10",
  };
  return (
    <div className="bg-card rounded-xl p-5 card-shadow">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${colorMap[color]}`}>
        <Icon size={20} />
      </div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="font-heading font-bold text-foreground mt-1 text-sm">{value}</p>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-border last:border-0">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-foreground text-right max-w-[60%]">{value}</span>
    </div>
  );
}

function ProgressItem({ label, done, active }: { label: string; done?: boolean; active?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
        done ? "bg-success text-success-foreground" : active ? "gradient-primary text-primary-foreground" : "bg-muted text-muted-foreground"
      }`}>
        {done ? <CheckCircle size={16} /> : active ? <Clock size={16} /> : <AlertCircle size={14} />}
      </div>
      <span className={`text-sm ${done ? "text-foreground font-medium" : active ? "text-primary font-semibold" : "text-muted-foreground"}`}>{label}</span>
    </div>
  );
}
