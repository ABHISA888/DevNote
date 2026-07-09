const SETTINGS_SECTIONS = [
  {
    title: 'Profile',
    description: 'Manage your personal details and workspace identity.',
  },
  {
    title: 'Notifications',
    description: 'Control alerts for projects, tasks, and workspace activity.',
  },
  {
    title: 'Security',
    description: 'Review password, sessions, and account protection settings.',
  },
  {
    title: 'Account',
    description: 'Update account preferences and connected workspace options.',
  },
];

export default function SettingsPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Settings</h1>
        <p className="text-slate-500">Configure your DevNote workspace preferences.</p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {SETTINGS_SECTIONS.map((section) => (
          <section
            key={section.title}
            className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
          >
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800">
              {section.title}
            </h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">{section.description}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
