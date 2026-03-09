// src/components/Team.tsx
export default function Team() {
  const team = [
    {
      name: "Alex Chen",
      role: "Founder & CEO",
      bio: "Former AI infrastructure lead at a major cloud provider",
      isAdvisor: false,
    },
    {
      name: "Sarah Miller",
      role: "Co-Founder & CTO",
      bio: "15 years building distributed systems at scale",
      isAdvisor: false,
    },
    {
      name: "Dr. James Liu",
      role: "Technical Advisor",
      bio: "PhD ML, former research scientist at top AI lab",
      isAdvisor: true,
    },
    {
      name: "Maria Santos",
      role: "Business Advisor",
      bio: "Ex-VP at enterprise SaaS, 3x founder exit",
      isAdvisor: true,
    },
  ];

  return (
    <section id="team" className="py-24" style={{ backgroundColor: 'rgba(30, 30, 30, 0.3)' }}>
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Meet the <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Team</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            Experienced builders and AI infrastructure experts dedicated to your success
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div
              key={index}
              className="p-6 rounded-3xl border backdrop-blur-xl text-center transition-transform hover:scale-105"
              style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border-color)' }}
            >
              {/* Avatar */}
              <div
                className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-white"
                style={{
                  background: member.isAdvisor
                    ? 'linear-gradient(135deg, #9333ea, #6366f1)'
                    : 'linear-gradient(135deg, #2563eb, #06b6d4)',
                }}
              >
                {member.name.split(' ').map(n => n[0]).join('')}
              </div>

              {/* Name */}
              <h3 className="text-lg font-bold mb-1">{member.name}</h3>

              {/* Role */}
              <p
                className="text-sm font-medium mb-2"
                style={{ color: member.isAdvisor ? '#a78bfa' : '#60a5fa' }}
              >
                {member.role}
              </p>

              {/* Bio */}
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
