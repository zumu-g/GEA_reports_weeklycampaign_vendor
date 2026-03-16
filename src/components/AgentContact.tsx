interface AgentContactProps {
  agentName: string;
  phone?: string;
  email?: string;
}

export default function AgentContact({ agentName, phone, email }: AgentContactProps) {
  return (
    <div className="bg-white rounded-2xl border border-border-light p-6 mb-6">
      <h3 className="text-base font-semibold text-foreground mb-4">Your Agent</h3>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-foreground rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white text-sm font-bold">
            {agentName.split(" ").map(n => n[0]).join("")}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-foreground">{agentName}</p>
          <p className="text-xs text-muted">Grants Estate Agents</p>
        </div>
        <div className="flex items-center gap-2">
          {phone && (
            <a
              href={`tel:${phone}`}
              className="w-10 h-10 rounded-full bg-background-secondary hover:bg-border-light flex items-center justify-center transition-colors duration-200"
              aria-label="Call agent"
            >
              <svg className="w-4 h-4 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
            </a>
          )}
          {email && (
            <a
              href={`mailto:${email}`}
              className="w-10 h-10 rounded-full bg-background-secondary hover:bg-border-light flex items-center justify-center transition-colors duration-200"
              aria-label="Email agent"
            >
              <svg className="w-4 h-4 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
