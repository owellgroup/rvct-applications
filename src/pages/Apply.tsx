import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/lib/auth-context";
import { courses } from "@/lib/courses";
import { Upload, FileText, CheckCircle, ChevronRight, ChevronLeft, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const regions = [
  "Zambezi", "Erongo", "Hardap", "//Karas", "Kavango East", "Kavango West",
  "Khomas", "Kunene", "Ohangwena", "Omaheke", "Omusati", "Oshana", "Oshikoto", "Otjozondjupa"
];

const steps = ["Personal Information", "Education & Employment", "Course Selection", "Upload Documents", "Create Account"];

export default function Apply() {
  const [step, setStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    surname: "", firstNames: "", dateOfBirth: "", idNumber: "", gender: "",
    maritalStatus: "", nationality: "", homeLanguage: "", passportNumber: "",
    passportExpiry: "", cellPhone: "", email: "", postalAddress: "",
    physicalAddress: "", town: "", medicalCondition: "No", medicalDetails: "",
    marginalisedCommunity: "No", marginalisedDetails: "", hostelAccommodation: "No",
    region: "", constituency: "", schoolAttended: "", highestGrade: "",
    schoolRegion: "", schoolPostalAddress: "", schoolPhone: "", employer: "",
    employerAddress: "", employerContact: "", employmentDuration: "", positionHeld: "",
    emergencyName: "", emergencyPostalAddress: "", emergencyTown: "",
    emergencyPhone: "", emergencyCell: "", emergencyRelationship: "",
    emergencySocialStatus: "", firstChoice: "", secondChoice: "",
  });
  const [documents, setDocuments] = useState<string[]>([]);
  const [accountEmail, setAccountEmail] = useState("");
  const [accountPassword, setAccountPassword] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const update = (field: string, value: string) => setForm({ ...form, [field]: value });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const names = Array.from(e.target.files).map(f => f.name);
      setDocuments(prev => [...prev, ...names]);
    }
  };

  const handleSubmit = () => {
    register(accountEmail || form.email, form as any, documents);
    toast({ title: "Application Submitted!", description: "Your application has been received. You can now login to track your status." });
    navigate("/dashboard");
  };

  const canNext = () => {
    if (step === 0) return form.surname && form.firstNames && form.dateOfBirth && form.idNumber && form.gender && form.cellPhone;
    if (step === 1) return form.schoolAttended && form.highestGrade && form.emergencyName && form.emergencyCell;
    if (step === 2) return form.firstChoice;
    if (step === 3) return documents.length > 0;
    if (step === 4) return accountEmail && accountPassword;
    return true;
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-24 pb-16 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
              Online <span className="text-primary">Application</span>
            </h1>
            <p className="text-muted-foreground mt-2">January 2026 Academic Year</p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-10 overflow-x-auto">
            {steps.map((s, i) => (
              <div key={i} className="flex items-center">
                <div className={`flex items-center gap-2 px-3 py-2 rounded-full text-xs font-semibold whitespace-nowrap ${
                  i === step ? "gradient-primary text-primary-foreground" :
                  i < step ? "bg-success text-success-foreground" : "bg-muted text-muted-foreground"
                }`}>
                  {i < step ? <CheckCircle size={14} /> : <span>{i + 1}</span>}
                  <span className="hidden sm:inline">{s}</span>
                </div>
                {i < steps.length - 1 && <ChevronRight size={16} className="mx-1 text-muted-foreground" />}
              </div>
            ))}
          </div>

          {/* Instructions */}
          {step === 0 && (
            <div className="bg-accent rounded-lg p-4 mb-6 text-sm text-accent-foreground">
              <p className="font-semibold mb-2">Instructions:</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>• This application must be accompanied by certified copies of birth certificate/identity card and relevant academic certificates.</li>
                <li>• Only properly completed application forms with all accompanying documents attached will be considered.</li>
                <li>• Applicants who meet the requirements will be invited for an Aptitude Test.</li>
                <li>• Fields marked with * are mandatory.</li>
                <li>• Submission deadline: Friday, 03 October 2025 @ 12:00</li>
              </ul>
            </div>
          )}

          <div className="bg-card rounded-xl p-6 md:p-8 card-shadow">
            {/* Step 1: Personal Info */}
            {step === 0 && (
              <div className="space-y-6 slide-enter">
                <h2 className="text-xl font-heading font-bold text-card-foreground border-b border-border pb-3">Applicant Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><Label>Surname *</Label><Input value={form.surname} onChange={e => update("surname", e.target.value)} placeholder="Enter surname" /></div>
                  <div><Label>First Name(s) *</Label><Input value={form.firstNames} onChange={e => update("firstNames", e.target.value)} placeholder="Enter first names" /></div>
                  <div><Label>Date of Birth *</Label><Input type="date" value={form.dateOfBirth} onChange={e => update("dateOfBirth", e.target.value)} /></div>
                  <div><Label>ID Number *</Label><Input value={form.idNumber} onChange={e => update("idNumber", e.target.value)} placeholder="National ID number" /></div>
                  <div>
                    <Label>Gender *</Label>
                    <Select value={form.gender} onValueChange={v => update("gender", v)}>
                      <SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger>
                      <SelectContent><SelectItem value="Male">Male</SelectItem><SelectItem value="Female">Female</SelectItem></SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Marital Status *</Label>
                    <Select value={form.maritalStatus} onValueChange={v => update("maritalStatus", v)}>
                      <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
                      <SelectContent><SelectItem value="Single">Single</SelectItem><SelectItem value="Married">Married</SelectItem><SelectItem value="Divorced">Divorced</SelectItem><SelectItem value="Widowed">Widowed</SelectItem></SelectContent>
                    </Select>
                  </div>
                  <div><Label>Nationality *</Label><Input value={form.nationality} onChange={e => update("nationality", e.target.value)} placeholder="e.g. Namibian" /></div>
                  <div><Label>Home Language</Label><Input value={form.homeLanguage} onChange={e => update("homeLanguage", e.target.value)} placeholder="e.g. Rukwangali" /></div>
                  <div><Label>Passport Number</Label><Input value={form.passportNumber} onChange={e => update("passportNumber", e.target.value)} placeholder="If applicable" /></div>
                  <div><Label>Passport Expiry Date</Label><Input type="date" value={form.passportExpiry} onChange={e => update("passportExpiry", e.target.value)} /></div>
                  <div><Label>Cell Phone Number *</Label><Input value={form.cellPhone} onChange={e => update("cellPhone", e.target.value)} placeholder="+264 ..." /></div>
                  <div><Label>Email Address *</Label><Input type="email" value={form.email} onChange={e => update("email", e.target.value)} placeholder="your@email.com" /></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2"><Label>Postal Address *</Label><Input value={form.postalAddress} onChange={e => update("postalAddress", e.target.value)} /></div>
                  <div><Label>Physical Address</Label><Input value={form.physicalAddress} onChange={e => update("physicalAddress", e.target.value)} /></div>
                  <div><Label>Town</Label><Input value={form.town} onChange={e => update("town", e.target.value)} /></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Do you have any physical or mental medical conditions? *</Label>
                    <Select value={form.medicalCondition} onValueChange={v => update("medicalCondition", v)}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent><SelectItem value="No">No</SelectItem><SelectItem value="Yes">Yes</SelectItem></SelectContent>
                    </Select>
                  </div>
                  {form.medicalCondition === "Yes" && (
                    <div><Label>If YES, specify</Label><Input value={form.medicalDetails} onChange={e => update("medicalDetails", e.target.value)} /></div>
                  )}
                  <div>
                    <Label>Do you come from a marginalised community? *</Label>
                    <Select value={form.marginalisedCommunity} onValueChange={v => update("marginalisedCommunity", v)}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent><SelectItem value="No">No</SelectItem><SelectItem value="Yes">Yes</SelectItem></SelectContent>
                    </Select>
                  </div>
                  {form.marginalisedCommunity === "Yes" && (
                    <div><Label>If YES, specify</Label><Input value={form.marginalisedDetails} onChange={e => update("marginalisedDetails", e.target.value)} /></div>
                  )}
                  <div>
                    <Label>Do you require hostel accommodation? *</Label>
                    <Select value={form.hostelAccommodation} onValueChange={v => update("hostelAccommodation", v)}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent><SelectItem value="No">No</SelectItem><SelectItem value="Yes">Yes</SelectItem></SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Region of Origin *</Label>
                    <Select value={form.region} onValueChange={v => update("region", v)}>
                      <SelectTrigger><SelectValue placeholder="Select region" /></SelectTrigger>
                      <SelectContent>{regions.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Education & Employment */}
            {step === 1 && (
              <div className="space-y-6 slide-enter">
                <h2 className="text-xl font-heading font-bold text-card-foreground border-b border-border pb-3">Educational History</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><Label>Name of Constituency</Label><Input value={form.constituency} onChange={e => update("constituency", e.target.value)} /></div>
                  <div><Label>School/Institution Attended *</Label><Input value={form.schoolAttended} onChange={e => update("schoolAttended", e.target.value)} /></div>
                  <div><Label>Highest Grade Passed *</Label><Input value={form.highestGrade} onChange={e => update("highestGrade", e.target.value)} placeholder="e.g. Grade 12" /></div>
                  <div><Label>School Region</Label><Input value={form.schoolRegion} onChange={e => update("schoolRegion", e.target.value)} /></div>
                  <div><Label>School Postal Address</Label><Input value={form.schoolPostalAddress} onChange={e => update("schoolPostalAddress", e.target.value)} /></div>
                  <div><Label>School Phone Number</Label><Input value={form.schoolPhone} onChange={e => update("schoolPhone", e.target.value)} /></div>
                </div>

                <h2 className="text-xl font-heading font-bold text-card-foreground border-b border-border pb-3 mt-8">Employment Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><Label>Employer</Label><Input value={form.employer} onChange={e => update("employer", e.target.value)} placeholder="If applicable" /></div>
                  <div><Label>Employer Address</Label><Input value={form.employerAddress} onChange={e => update("employerAddress", e.target.value)} /></div>
                  <div><Label>Contact Number</Label><Input value={form.employerContact} onChange={e => update("employerContact", e.target.value)} /></div>
                  <div><Label>Duration of Employment</Label><Input value={form.employmentDuration} onChange={e => update("employmentDuration", e.target.value)} /></div>
                  <div><Label>Position Held</Label><Input value={form.positionHeld} onChange={e => update("positionHeld", e.target.value)} /></div>
                </div>

                <h2 className="text-xl font-heading font-bold text-card-foreground border-b border-border pb-3 mt-8">Emergency Contact (Parent or Legal Guardian)</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><Label>Name *</Label><Input value={form.emergencyName} onChange={e => update("emergencyName", e.target.value)} /></div>
                  <div><Label>Postal Address</Label><Input value={form.emergencyPostalAddress} onChange={e => update("emergencyPostalAddress", e.target.value)} /></div>
                  <div><Label>Town</Label><Input value={form.emergencyTown} onChange={e => update("emergencyTown", e.target.value)} /></div>
                  <div><Label>Phone</Label><Input value={form.emergencyPhone} onChange={e => update("emergencyPhone", e.target.value)} /></div>
                  <div><Label>Cell Phone *</Label><Input value={form.emergencyCell} onChange={e => update("emergencyCell", e.target.value)} /></div>
                  <div><Label>Relationship</Label><Input value={form.emergencyRelationship} onChange={e => update("emergencyRelationship", e.target.value)} /></div>
                  <div>
                    <Label>Social Status *</Label>
                    <Select value={form.emergencySocialStatus} onValueChange={v => update("emergencySocialStatus", v)}>
                      <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Employed">Employed</SelectItem>
                        <SelectItem value="Unemployed">Unemployed</SelectItem>
                        <SelectItem value="Self-employed">Self-employed</SelectItem>
                        <SelectItem value="Retired">Retired</SelectItem>
                        <SelectItem value="Pensioner">Pensioner</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Course Selection */}
            {step === 2 && (
              <div className="space-y-6 slide-enter">
                <h2 className="text-xl font-heading font-bold text-card-foreground border-b border-border pb-3">Occupational Area of Choice</h2>
                <p className="text-sm text-muted-foreground">Choose in order of preference the Occupational Area(s) you are applying for. <strong>Choose ONLY 2</strong> (Two Occupational Areas).</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>First Choice *</Label>
                    <Select value={form.firstChoice} onValueChange={v => update("firstChoice", v)}>
                      <SelectTrigger><SelectValue placeholder="Select first choice" /></SelectTrigger>
                      <SelectContent>
                        {courses.map(c => <SelectItem key={c.id} value={c.name}>{c.name} ({c.level})</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Second Choice</Label>
                    <Select value={form.secondChoice} onValueChange={v => update("secondChoice", v)}>
                      <SelectTrigger><SelectValue placeholder="Select second choice" /></SelectTrigger>
                      <SelectContent>
                        {courses.filter(c => c.name !== form.firstChoice).map(c => (
                          <SelectItem key={c.id} value={c.name}>{c.name} ({c.level})</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="bg-accent rounded-lg p-4 mt-6">
                  <h3 className="font-heading font-semibold text-accent-foreground mb-2">Declaration</h3>
                  <p className="text-sm text-muted-foreground">
                    By proceeding, I confirm that all the information provided is correct to the best of my knowledge and that all the attached supporting documents are genuine.
                  </p>
                </div>
              </div>
            )}

            {/* Step 4: Upload Documents */}
            {step === 3 && (
              <div className="space-y-6 slide-enter">
                <h2 className="text-xl font-heading font-bold text-card-foreground border-b border-border pb-3">Upload Documents</h2>
                <p className="text-sm text-muted-foreground">Please upload the following required documents:</p>
                <ul className="text-sm text-muted-foreground space-y-1 mb-4">
                  <li>• Certified copy of ID</li>
                  <li>• Certified copy of Passport (if applicable)</li>
                  <li>• Certified copy of Grade 10, 11, 12 or Level 3/4 Certificate</li>
                </ul>

                <div className="border-2 border-dashed border-primary/30 rounded-xl p-10 text-center bg-accent/50 hover:bg-accent transition cursor-pointer relative">
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    onChange={handleFileUpload}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <Upload size={48} className="mx-auto mb-4 text-primary" />
                  <p className="font-heading font-semibold text-foreground">Click or drag files to upload</p>
                  <p className="text-sm text-muted-foreground mt-1">PDF, JPG, PNG, DOC (Max 10MB each)</p>
                </div>

                {documents.length > 0 && (
                  <div className="space-y-2 mt-4">
                    <h3 className="font-semibold text-sm text-card-foreground">Uploaded Documents:</h3>
                    {documents.map((doc, i) => (
                      <div key={i} className="flex items-center gap-3 bg-accent rounded-lg p-3">
                        <FileText size={20} className="text-primary" />
                        <span className="text-sm text-card-foreground flex-1">{doc}</span>
                        <CheckCircle size={16} className="text-success" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Step 5: Create Account */}
            {step === 4 && (
              <div className="space-y-6 slide-enter">
                <h2 className="text-xl font-heading font-bold text-card-foreground border-b border-border pb-3">Create Your Account</h2>
                <p className="text-sm text-muted-foreground">
                  Enter the email and password you will use to login and track your application status.
                </p>
                <div className="max-w-md mx-auto space-y-4">
                  <div>
                    <Label>Email Address *</Label>
                    <Input type="email" value={accountEmail} onChange={e => setAccountEmail(e.target.value)} placeholder="your@email.com" />
                  </div>
                  <div className="relative">
                    <Label>Password *</Label>
                    <Input type={showPassword ? "text" : "password"} value={accountPassword} onChange={e => setAccountPassword(e.target.value)} placeholder="Create a password" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-8 text-muted-foreground">
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-6 border-t border-border">
              <Button
                variant="outline"
                onClick={() => setStep(s => s - 1)}
                disabled={step === 0}
                className="gap-2"
              >
                <ChevronLeft size={16} /> Previous
              </Button>
              {step < steps.length - 1 ? (
                <Button
                  onClick={() => setStep(s => s + 1)}
                  disabled={!canNext()}
                  className="gradient-primary text-primary-foreground gap-2"
                >
                  Next <ChevronRight size={16} />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={!canNext()}
                  className="gradient-accent text-secondary-foreground font-bold gap-2"
                >
                  Submit Application <CheckCircle size={16} />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
