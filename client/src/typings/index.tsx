export interface ButtonProps {
  children: React.ReactNode;
  className?: string;
}

export interface LeafResponse {
  message: string;
  leaf: {
    _id: string;
    species: string;
    image: string;
    features: {
      length: number;
      width: number;
      color: string;
    };
    [key: string]: any;
  };
}
