import { useEffect, useState } from "react"
import PersonalInfo from "./PersonalInfo";
import PasswordInfo from "./PasswordInfo";
import OtpVerificationForm from "./OtpVerification";
import PersonalInfoKYC from "./PersonalInfoKYC";


const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    timezone: '',
    gender: 'male',
    phone: '',
    experience: 0,
    qualification: 'ond',
    docUrl: '',
    password: '',

}

export default function SignUp({}) {
    const [formData, setFormData] = useState(initialValues);
    const [ submitForm, setSubmitForm ] = useState(false);
    const [activeTab, setActiveTab] = useState(1);

    const props = { formData, setFormData }

    return (
        <div>
            {activeTab === 1 && 
                <PersonalInfo 
                    props={props} 
                    setActiveTab={() => setActiveTab(activeTab + 1)}
                    />
            }

            {activeTab === 2 && 
                <PersonalInfoKYC 
                    props={props} 
                    setPreviousTab={() => setActiveTab(activeTab - 1)}
                    setActiveTab={() => setActiveTab(activeTab + 1)}
                    />
            }
            {activeTab === 3 && 
                <PasswordInfo 
                    props={props} 
                    />
            }
            {/* {activeTab === 3 && 
                <OtpVerificationForm formData={formData} />
            } */}
        </div>
    )
}