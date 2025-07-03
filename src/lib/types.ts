export interface IService {
  title: string;
  homeDescription: string;
  description: string;
  image: string;
  homeImage: string;
  alt: string;
  homeAlt: string;
  id: string;
}

export enum ServiceType {
  ENTREPRENØR = "ENTREPRENØR",
  RENOVERING = "RENOVERING",
  SERVICEOPPDRAG = "SERVICEOPPDRAG",
  BYGGINREDNING = "BYGGINREDNING",
}

export interface ITeamMember {
  id: number;
  name: string;
  pic: string;
  showOnServicePage?: boolean;
  position: string;
  phone: string;
  email: string;
}

export interface IProject {
  id: string;
  hero: string;
  type: ServiceType;
  title: string;
  homeDescription: string;
  isFavorite?: boolean;
  shortDescription: string;
  address: string;
  customer: string;
  pictures: string[];
  description: string;
  middlePic?: string;
  afterPicDiscription?: string;
}

export interface IRequest {
  subject: string;
  email: string;
  name: string;
  service: string;
  phone: string;
  company: string;
  message: string;
  file?: File;
}
