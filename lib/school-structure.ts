export const schoolStructure = {
    Naturkunskap: {
      "Naturkunskap 1a1": ["",],
      "Naturkunskap 1b": ["Ekologi", "Hållbar Utveckling & Energi", "Hälsa och Livsstil", "Normer, Relation & Sex", "Genetik", "Genteknik"],
      "Naturkunskap 2": [""],
    },
    Biologi: {
      "Biologi 1": [""],
      "Biologi 2": [""],
    },
    Kemi: {
      "Kemi 1": ["Vetenskapligt Arbetssätt", "Kemiska Bindningar", "Kemiska Beräkningar", "Syror och Baser", "Termokemi", "Gaser", "Elektrokemi"],
      "Kemi 2": [""],
    },
    NaturSpec: {
      "Naturvetenskaplig Specialisering": [""],
    },
  } as const;
  
  export type Subject = keyof typeof schoolStructure;

  export function getUnits(subject: Subject, course: string): readonly string[] {
    return schoolStructure[subject][
      course as keyof (typeof schoolStructure)[Subject]
    ];
  }