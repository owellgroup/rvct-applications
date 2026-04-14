import weldingImg from "@/assets/courses/welding.jpg";
import officeAdminImg from "@/assets/courses/office-admin.jpg";
import boilerImg from "@/assets/courses/boiler.jpg";
import electricalImg from "@/assets/courses/electrical.jpg";
import horticultureImg from "@/assets/courses/horticulture.jpg";
import bricklayingImg from "@/assets/courses/bricklaying.jpg";
import automotiveImg from "@/assets/courses/automotive.jpg";
import farmMachineryImg from "@/assets/courses/farm-machinery.jpg";
import plumbingImg from "@/assets/courses/plumbing.jpg";
import joineryImg from "@/assets/courses/joinery.jpg";

export interface Course {
  id: string;
  name: string;
  level: string;
  duration: string;
  description: string;
  image: string;
}

export const courses: Course[] = [
  {
    id: "office-admin",
    name: "Office Administration",
    level: "National Diploma Level 5",
    duration: "3 Years",
    description: "Develop professional office management, communication, and administrative skills for a career in business environments.",
    image: officeAdminImg,
  },
  {
    id: "welding",
    name: "Welding & Metal Fabrication",
    level: "Level 2",
    duration: "2 Years",
    description: "Master MIG, TIG, and arc welding techniques, metal cutting, and fabrication for industrial applications.",
    image: weldingImg,
  },
  {
    id: "boiler",
    name: "Boiler Making",
    level: "Level 2",
    duration: "2 Years",
    description: "Learn to fabricate, assemble, and repair boilers, pressure vessels, and heavy steel structures.",
    image: boilerImg,
  },
  {
    id: "electrical",
    name: "Electrical General",
    level: "Level 2",
    duration: "2 Years",
    description: "Gain expertise in electrical installations, wiring, maintenance, and industrial electrical systems.",
    image: electricalImg,
  },
  {
    id: "horticulture",
    name: "Horticulture & Crop Husbandry",
    level: "Level 2",
    duration: "2 Years",
    description: "Study plant science, landscaping, crop production, and sustainable agriculture techniques.",
    image: horticultureImg,
  },
  {
    id: "bricklaying",
    name: "Bricklaying & Plastering",
    level: "Level 1",
    duration: "1 Year",
    description: "Learn professional bricklaying, plastering, tiling, and construction techniques for the building industry.",
    image: bricklayingImg,
  },
  {
    id: "automotive",
    name: "Automotive Mechatronics",
    level: "Level 2",
    duration: "2 Years",
    description: "Combine mechanical and electronic vehicle systems training including diagnostics, repair, and maintenance.",
    image: automotiveImg,
  },
  {
    id: "farm-machinery",
    name: "Farm Machinery",
    level: "Level 2",
    duration: "2 Years",
    description: "Specialize in the maintenance, repair, and operation of agricultural equipment and farm machinery.",
    image: farmMachineryImg,
  },
  {
    id: "plumbing",
    name: "Plumbing & Pipefitting",
    level: "Level 1",
    duration: "1 Year",
    description: "Learn plumbing installations, pipefitting, water systems, and sanitation for residential and commercial buildings.",
    image: plumbingImg,
  },
  {
    id: "joinery",
    name: "Joinery & Cabinet Making",
    level: "Level 1",
    duration: "1 Year",
    description: "Master woodworking, furniture design, cabinet construction, and joinery techniques using modern tools.",
    image: joineryImg,
  },
];
