import kevImage from "@/assets/team/kev.jpg";
import thomasImage from "@/assets/team/thomas.jpg";
import codyImage from "@/assets/team/cody.jpg";
import sophiaImage from "@/assets/team/sophia.jpg";
import ignacioImage from "@/assets/team/ignacio.png";

export interface TeamMember {
  name: string;
  twitter: string | null;
  initials: string;
  image: any | null;
}

export const teamMembers: TeamMember[] = [
  {
    name: "Kev Wedderburn",
    twitter: "@kevaundray",
    initials: "KW",
    image: kevImage
  },
  {
    name: "Thomas Coratger",
    twitter: "@tcoratger",
    initials: "TC",
    image: thomasImage
  },
  {
    name: "Cody Gunton",
    twitter: "@codytouchgrass",
    initials: "CG",
    image: codyImage
  },
  {
    name: "Han Jian",
    twitter: "@han__0110",
    initials: "HJ",
    image: null
  },
  {
    name: "Radek",
    twitter: null,
    initials: "R",
    image: null
  },
  {
    name: "Sophia Gold",
    twitter: "@_sophiagold_",
    initials: "SG",
    image: sophiaImage
  },
  {
    name: "Ignacio Hagopian",
    twitter: "@ignaciohagopian",
    initials: "IH",
    image: ignacioImage
  }
];
