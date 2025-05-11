import { User, Settings, Lock, Key, FileQuestion, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const ProfilePage = () => {
  const { user, signOut } = useAuthStore();
  
  const profileSections = [
    {
      icon: <Settings className="h-5 w-5" />,
      title: 'Account Settings',
      description: 'Manage your account details and preferences'
    },
    {
      icon: <Lock className="h-5 w-5" />,
      title: 'Privacy & Security',
      description: 'Control your privacy settings and security options'
    },
    {
      icon: <Key className="h-5 w-5" />,
      title: 'Connected Services',
      description: 'Manage Google Drive and other connected services'
    },
    {
      icon: <FileQuestion className="h-5 w-5" />,
      title: 'Help & Support',
      description: 'Get help and answers to your questions'
    }
  ];
  
  return (
    <div className="container-custom py-24">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-semibold">My Profile</h1>
        <p className="text-secondary-600 dark:text-secondary-400">
          Manage your account settings and preferences
        </p>
      </div>
      
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="rounded-lg bg-white p-6 shadow-smooth dark:bg-secondary-800">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 h-24 w-24 overflow-hidden rounded-full border-4 border-white shadow-md dark:border-secondary-700">
                <img
                  src={user?.photoUrl || 'https://via.placeholder.com/96'}
                  alt={user?.name || 'User profile'}
                  className="h-full w-full object-cover"
                />
              </div>
              <h2 className="mb-1 text-xl font-semibold">{user?.name || 'User Name'}</h2>
              <p className="mb-4 text-secondary-600 dark:text-secondary-400">
                {user?.email || 'user@example.com'}
              </p>
              
              <button
                onClick={signOut}
                className="btn btn-outline w-full"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
        
        {/* Settings Sections */}
        <div className="lg:col-span-2">
          <div className="rounded-lg bg-white shadow-smooth dark:bg-secondary-800">
            {profileSections.map((section, index) => (
              <div
                key={index}
                className={`flex cursor-pointer items-start p-6 transition-colors hover:bg-secondary-50 dark:hover:bg-secondary-700 ${
                  index !== profileSections.length - 1
                    ? 'border-b border-secondary-200 dark:border-secondary-700'
                    : ''
                }`}
              >
                <div className="mr-4 mt-1 rounded-lg bg-secondary-100 p-3 text-primary-500 dark:bg-secondary-700">
                  {section.icon}
                </div>
                <div>
                  <h3 className="mb-1 font-medium">{section.title}</h3>
                  <p className="text-sm text-secondary-600 dark:text-secondary-400">
                    {section.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;