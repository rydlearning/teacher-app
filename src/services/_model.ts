export interface SignUpProps {
    firstName: string,
    lastName: string,
    email: string,
    gender: string,
    password: string,
    phone: string,
    country: string,
    timezone: string,
    timeOffset: number,
    qualification: string,
    experience: number | string,
    docUrl: string
}

export interface SignInProps {
    email: string,
    password: string
}

export interface PasswordResetProps {
    email: string
}

export interface PasswordUpdateProps {
    password1: string,
    password2: string,
    passwordOld: string
}

export interface SwapProgramProps {
    body: string,
    toTeacherId: number,
    programId: number
}


export interface MediaAssessmentUrlProps {
    assessmentUrl?: string,
    mediaUrl?: string
}

export interface AttendanceProps {
    score: number,
    status: boolean,
    programId: number | string
}

export interface ReportCardData {
    childId: string;
    programId: string;
    parentId: string;
    progressNotes: string;
    name: string;
    areasForImprovement: string;
    supportSuggestions: string;
    cohortCompleted: boolean;
    additionalComments?: string;
  }