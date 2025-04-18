export interface AuthProps {
    props: {
        setFormData: (data: any) => void,
        loading?: boolean,
        formData: {
            firstName: string,
            lastName: string,
            email: string,
            country: string,
            gender: string,
            phone: string,
            qualification: string,
            experience: number | string,
            password: string,
            docUrl: string,
            timezone: string,
        
        }
    },
    setActiveTab: () => void,
}