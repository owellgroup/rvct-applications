import { createContext, useContext, useState, ReactNode } from "react";

interface ApplicationData {
  surname: string;
  firstNames: string;
  dateOfBirth: string;
  idNumber: string;
  gender: string;
  maritalStatus: string;
  nationality: string;
  homeLanguage: string;
  passportNumber: string;
  passportExpiry: string;
  cellPhone: string;
  email: string;
  postalAddress: string;
  physicalAddress: string;
  town: string;
  medicalCondition: string;
  medicalDetails: string;
  marginalisedCommunity: string;
  marginalisedDetails: string;
  hostelAccommodation: string;
  region: string;
  constituency: string;
  schoolAttended: string;
  highestGrade: string;
  schoolRegion: string;
  schoolPostalAddress: string;
  schoolPhone: string;
  employer: string;
  employerAddress: string;
  employerContact: string;
  employmentDuration: string;
  positionHeld: string;
  emergencyName: string;
  emergencyPostalAddress: string;
  emergencyTown: string;
  emergencyPhone: string;
  emergencyCell: string;
  emergencyRelationship: string;
  emergencySocialStatus: string;
  firstChoice: string;
  secondChoice: string;
}

interface User {
  email: string;
  studentNumber: string;
  applicationData: ApplicationData | null;
  applicationStatus: string;
  documents: string[];
}

interface AuthContextType {
  user: User | null;
  login: (email: string) => void;
  logout: () => void;
  register: (email: string, applicationData: ApplicationData, documents: string[]) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

function generateStudentNumber(): string {
  const digits = Math.floor(Math.random() * 10000000).toString().padStart(7, "0");
  return `22${digits}`;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("rvtc_user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = (email: string) => {
    const saved = localStorage.getItem("rvtc_user");
    if (saved) {
      const u = JSON.parse(saved);
      setUser(u);
    } else {
      const newUser: User = {
        email,
        studentNumber: generateStudentNumber(),
        applicationData: null,
        applicationStatus: "Under Review",
        documents: [],
      };
      localStorage.setItem("rvtc_user", JSON.stringify(newUser));
      setUser(newUser);
    }
  };

  const logout = () => {
    setUser(null);
  };

  const register = (email: string, applicationData: ApplicationData, documents: string[]) => {
    const newUser: User = {
      email,
      studentNumber: generateStudentNumber(),
      applicationData,
      applicationStatus: "Submitted - Under Review",
      documents,
    };
    localStorage.setItem("rvtc_user", JSON.stringify(newUser));
    setUser(newUser);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
