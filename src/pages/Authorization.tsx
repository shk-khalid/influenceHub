import { AuthForms } from '../components/auth/AuthForm';
import { Zap } from 'lucide-react';

export const Authorization = () => {
    return (
        <div className="min-h-screen flex flex-col lg:flex-row">
            {/* Left Section - Content */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-r from-indigo-50 via-purple-50 to-white p-8 lg:p-16">
                <div className="flex items-center justify-center w-full">
                    <div className="max-w-lg">
                        <div className="flex items-center gap-3 mb-6">
                            <Zap className="w-8 h-8 text-indigo-600" />
                            <span className="text-2xl font-bold text-gray-900">InfluenceHub</span>
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6">
                            Connect. Collaborate. Create.
                        </h1>
                        <p className="text-lg text-gray-700 mb-8">
                            Join the platform where influencers and brands create meaningful partnerships.
                        </p>
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            <div className="flex items-center gap-4 mb-4">
                                <img
                                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"
                                    alt="Sarah Johnson"
                                    className="w-12 h-12 rounded-full object-cover ring-2 ring-white"
                                />
                                <div>
                                    <h3 className="font-semibold text-gray-900">Sarah Johnson</h3>
                                    <p className="text-sm text-gray-600">Fashion Influencer</p>
                                </div>
                            </div>
                            <p className="text-gray-700">
                                "InfluenceHub transformed how I collaborate with brands. The platform's seamless
                                experience and professional tools make every partnership a success."
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Section - Auth Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center bg-white">
                <div className="w-full max-w-md">
                    {/* Using the AuthForms component */}
                    <AuthForms />
                </div>
            </div>
        </div>
    );
};
