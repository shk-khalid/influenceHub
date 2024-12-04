import React from 'react';
import { Github, Mail, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">
                            Collabwise
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4 max-w-md">
                            A final year project demonstrating modern web development techniques and best practices.
                        </p>
                        <div className="flex space-x-4">
                            <SocialLink href="https://github.com/shk-khalid/influenceHub" icon={WrappedIcon(Github)} />
                            <SocialLink href="#" icon={WrappedIcon(Mail)} />
                            <SocialLink href="#" icon={WrappedIcon(Linkedin)} />
                        </div>
                    </div>

                    <div>
                        <h4 className="text-gray-900 dark:text-white font-semibold mb-4">Project</h4>
                        <FooterLinks
                            links={['Documentation', 'Technologies', 'Source Code', 'Demo']}
                        />
                    </div>

                    <div>
                        <h4 className="text-gray-900 dark:text-white font-semibold mb-4">Resources</h4>
                        <FooterLinks
                            links={['Research Paper', 'Technical Specs', 'Implementation Guide', 'API Docs']}
                        />
                    </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 text-center">
                    <p className="text-gray-600 dark:text-gray-400">
                        © {new Date().getFullYear()} Final Year Project. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

const WrappedIcon = (Icon: React.FC<{ size?: string | number }>): React.FC<{ size?: number }> => {
    return ({ size, ...props }) => <Icon size={size?.toString()} {...props} />;
};

const SocialLink: React.FC<{ href: string; icon: React.FC<{ size?: number }> }> = ({
    href,
    icon: Icon,
}) => (
    <a
        href={href}
        className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-indigo-100 dark:hover:bg-indigo-900 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
    >
        <Icon size={20} />
    </a>
);

const FooterLinks: React.FC<{ links: string[] }> = ({ links }) => (
    <ul className="space-y-2">
        {links.map((link) => (
            <li key={link}>
                <a
                    href="#"
                    className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                    {link}
                </a>
            </li>
        ))}
    </ul>
);

export default Footer;