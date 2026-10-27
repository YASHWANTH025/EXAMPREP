import { useEffect, useState } from 'react'

type Screen = 'home' | 'subjects' | 'pyq' | 'tutor' | 'library' | 'profile' | 'login' | 'signup' | 'quiz'

const Icon = ({ name, size = 20 }: { name: string; size?: number }) => {
  const paths: Record<string, React.ReactNode> = {
    home: <><path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10v10h13V10M9 20v-6h6v6"/></>,
    grid: <><rect x="4" y="4" width="6" height="6" rx="2"/><rect x="14" y="4" width="6" height="6" rx="2"/><rect x="4" y="14" width="6" height="6" rx="2"/><rect x="14" y="14" width="6" height="6" rx="2"/></>,
    spark: <><path d="m12 3 1.3 4.2a5.2 5.2 0 0 0 3.5 3.5L21 12l-4.2 1.3a5.2 5.2 0 0 0-3.5 3.5L12 21l-1.3-4.2a5.2 5.2 0 0 0-3.5-3.5L3 12l4.2-1.3a5.2 5.2 0 0 0 3.5-3.5Z"/></>,
    bookmark: <path d="M6 4.5A1.5 1.5 0 0 1 7.5 3h9A1.5 1.5 0 0 1 18 4.5V21l-6-3.5L6 21Z"/>,
    user: <><circle cx="12" cy="8" r="4"/><path d="M4.5 21a7.5 7.5 0 0 1 15 0"/></>,
    arrow: <path d="m9 18 6-6-6-6"/>,
    play: <path d="m9 7 8 5-8 5Z"/>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    flame: <path d="M12 22c4 0 7-2.8 7-7 0-3.5-2-6.2-4.5-8.5.1 2.4-1 3.8-2.2 4.3.2-3.9-2.1-6.7-4.4-8.8.1 3.3-2.9 5.9-2.9 9.5C5 17.3 8.1 22 12 22Z"/>,
    send: <><path d="m21 3-7 18-4-7-7-4Z"/><path d="m10 14 11-11"/></>,
    check: <path d="m5 12 4 4 10-10"/>,
    chevron: <path d="m6 9 6 6 6-6"/>,
    close: <><path d="m6 6 12 12M18 6 6 18"/></>,
    search: <><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></>,
    note: <><path d="M6 3h9l4 4v14H6Z"/><path d="M14 3v5h5M9 13h6M9 17h4"/></>,
  }
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}

const subjects = [
  { name: 'Mathematics', detail: '12 modules · 68% complete', color: 'violet', initial: 'M', progress: 68 },
  { name: 'Physics', detail: '10 modules · 42% complete', color: 'blue', initial: 'P', progress: 42 },
  { name: 'Chemistry', detail: '9 modules · 76% complete', color: 'amber', initial: 'C', progress: 76 },
  { name: 'Biology', detail: '14 modules · 31% complete', color: 'green', initial: 'B', progress: 31 },
]

const nav = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'subjects', label: 'Subjects', icon: 'grid' },
  { id: 'pyq', label: 'PYQs', icon: 'note' },
  { id: 'tutor', label: 'AI Tutor', icon: 'spark' },
  { id: 'library', label: 'Library', icon: 'bookmark' },
] as const

function App() {
  const [screen, setScreen] = useState<Screen>('home')
  const [selectedSubject, setSelectedSubject] = useState('Mathematics')
  const [answer, setAnswer] = useState<number | null>(null)
  const [chat, setChat] = useState<string[]>([])
  const [message, setMessage] = useState('')

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [screen])

  const goSubject = (name: string) => {
    setSelectedSubject(name)
    setScreen('subjects')
  }

  if (screen === 'login') return <Login onContinue={() => setScreen('home')} onSignup={() => setScreen('signup')} />
  if (screen === 'signup') return <Signup onContinue={() => setScreen('home')} onLogin={() => setScreen('login')} />

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <button className="brand" onClick={() => setScreen('home')} aria-label="ExamPrep home">
          <span className="brand-mark"><Icon name="spark" size={18} /></span>
          <span>EXAMPREP</span>
        </button>
        <nav className="side-nav">
          <span className="eyebrow nav-label">Workspace</span>
          {nav.map(item => (
            <button key={item.id} className={`nav-item ${screen === item.id ? 'active' : ''}`} onClick={() => setScreen(item.id)}>
              <Icon name={item.icon} /><span>{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="focus-card">
          <span className="focus-icon"><Icon name="flame" size={18} /></span>
          <div><strong>12 day streak</strong><p>Personal best: 18 days</p></div>
        </div>
        <button className={`profile-row ${screen === 'profile' ? 'active' : ''}`} onClick={() => setScreen('profile')}>
          <span className="avatar">AK</span><span><strong>Arjun Kumar</strong><small>JEE Advanced</small></span><Icon name="arrow" size={16} />
        </button>
      </aside>

      <main>
        <header className="topbar">
          <button className="mobile-brand" onClick={() => setScreen('home')}><span className="brand-mark"><Icon name="spark" size={16}/></span> EXAMPREP</button>
          <div className="search"><Icon name="search" size={18}/><span>Search topics, notes, questions...</span><kbd>⌘ K</kbd></div>
          <button className="icon-btn" aria-label="Profile" onClick={() => setScreen('profile')}><span className="avatar compact">AK</span></button>
        </header>

        <div className="content page-enter">
          {screen === 'home' && <Dashboard goSubject={goSubject} setScreen={setScreen} />}
          {screen === 'subjects' && <SubjectDetail name={selectedSubject} setScreen={setScreen} />}
          {screen === 'pyq' && <PreviousYearPapers />}
          {screen === 'tutor' && <Tutor chat={chat} message={message} setMessage={setMessage} send={() => { if(message.trim()){ setChat([...chat, message]); setMessage('') } }} />}
          {screen === 'library' && <Library />}
          {screen === 'profile' && <Profile onLogout={() => setScreen('login')} />}
          {screen === 'quiz' && <Quiz answer={answer} setAnswer={setAnswer} exit={() => { setAnswer(null); setScreen('subjects') }} />}
        </div>
      </main>

      <nav className="bottom-nav">
        {nav.map(item => <button key={item.id} className={screen === item.id ? 'active' : ''} onClick={() => setScreen(item.id)}><Icon name={item.icon}/><span>{item.label}</span></button>)}
      </nav>
    </div>
  )
}

function Dashboard({ goSubject, setScreen }: { goSubject: (s:string)=>void; setScreen:(s:Screen)=>void }) {
  return <>
    <section className="hero reveal">
      <div><span className="eyebrow">Monday, 24 June</span><h1>Good evening, Arjun.</h1><p>Your consistency is compounding. Pick up where you left off.</p></div>
      <div className="week-strip">
        {['M','T','W','T','F','S','S'].map((d,i)=><div key={i} className={i < 5 ? 'done' : i === 5 ? 'today' : ''}><span>{d}</span><i>{i < 5 ? <Icon name="check" size={12}/> : i + 17}</i></div>)}
      </div>
    </section>

    <section className="continue-card reveal delay-1">
      <div className="continue-copy">
        <span className="pill"><span className="pulse-dot"/> Continue learning</span>
        <h2>Electrostatic Potential<br className="desktop-only"/> & Capacitance</h2>
        <p>Physics · Module 04 · 18 min remaining</p>
        <button className="primary" onClick={() => setScreen('quiz')}><Icon name="play" size={17}/> Resume lesson</button>
      </div>
      <div className="orbit-visual">
        <div className="orbit o1"/><div className="orbit o2"/><div className="orb-center">e<span>−</span></div><i className="electron e1"/><i className="electron e2"/>
      </div>
      <div className="completion"><span>68%</span><small>completed</small></div>
    </section>

    <div className="section-head reveal delay-2"><div><span className="eyebrow">Your curriculum</span><h2>Subjects</h2></div><button className="text-btn" onClick={()=>goSubject('Mathematics')}>View all <Icon name="arrow" size={16}/></button></div>
    <section className="subject-grid">
      {subjects.map((s,i)=><button key={s.name} className={`subject-card ${s.color} reveal delay-${i+1}`} onClick={()=>goSubject(s.name)}>
        <div className="subject-top"><span className="subject-icon">{s.initial}</span><span className="open-arrow"><Icon name="arrow" size={17}/></span></div>
        <div><h3>{s.name}</h3><p>{s.detail}</p></div>
        <div className="progress"><i style={{width:`${s.progress}%`}}/></div>
      </button>)}
    </section>

    <section className="lower-grid">
      <div className="panel reveal"><div className="section-head compact-head"><div><span className="eyebrow">Smart revision</span><h2>Today's focus</h2></div><span className="count">03</span></div>
        {['Organic reaction mechanisms','Rotational dynamics','Definite integration'].map((x,i)=><button className="task" key={x}><span className={`task-number n${i}`}>0{i+1}</span><span><strong>{x}</strong><small>{i===0?'Chemistry · 12 questions':i===1?'Physics · 8 questions':'Mathematics · 10 questions'}</small></span><Icon name="arrow" size={16}/></button>)}
      </div>
      <div className="panel stats-panel reveal delay-2"><span className="eyebrow">This week</span><div className="stat"><strong>14.8</strong><span>hours focused</span></div><div className="bars">{[44,62,55,78,92,34,18].map((h,i)=><div key={i}><i style={{height:`${h}%`}}/><small>{['M','T','W','T','F','S','S'][i]}</small></div>)}</div></div>
    </section>
  </>
}

function SubjectDetail({ name, setScreen }: { name:string; setScreen:(s:Screen)=>void }) {
  const modules = ['Foundations & core concepts','Functions and graphing','Differential calculus','Integral calculus','Vectors and 3D geometry']
  return <>
    <section className="subject-hero reveal"><span className="eyebrow">Your curriculum / {name}</span><div className="subject-title"><div><h1>{name}</h1><p>Master concepts through focused lessons, adaptive practice, and concise revision.</p></div><div className="ring"><svg viewBox="0 0 44 44"><circle cx="22" cy="22" r="18"/><circle className="ring-progress" cx="22" cy="22" r="18"/></svg><span>68<small>%</small></span></div></div></section>
    <div className="metrics reveal delay-1"><div><strong>32</strong><span>Lessons complete</span></div><div><strong>284</strong><span>Questions solved</span></div><div><strong>82%</strong><span>Accuracy</span></div></div>
    <div className="section-head reveal delay-2"><div><span className="eyebrow">Learning path</span><h2>Modules</h2></div><button className="secondary" onClick={()=>setScreen('quiz')}><Icon name="play" size={15}/> Quick practice</button></div>
    <section className="module-list">
      {modules.map((m,i)=><article className={`module reveal delay-${Math.min(i+1,4)}`} key={m}>
        <span className={`module-index ${i<2?'complete':''}`}>{i<2?<Icon name="check" size={16}/>:String(i+1).padStart(2,'0')}</span>
        <div><span className="eyebrow">{i<2?'Completed':i===2?'In progress':'Up next'} · {4+i} lessons</span><h3>{m}</h3><p>{i===2?'Applications of derivatives, maxima, minima and rate of change':'Build clarity with short lessons and targeted practice.'}</p></div>
        <button className="circle-btn" onClick={()=>setScreen('quiz')} aria-label={`Open ${m}`}><Icon name={i===2?'play':'arrow'} size={17}/></button>
      </article>)}
    </section>
  </>
}

function Quiz({ answer, setAnswer, exit }: { answer:number|null; setAnswer:(n:number)=>void; exit:()=>void }) {
  return <section className="quiz-wrap">
    <div className="quiz-top"><div><span className="eyebrow">Physics · Electrostatics</span><strong>Question 07 <span>/ 15</span></strong></div><div className="quiz-progress"><i/></div><button className="icon-btn" onClick={exit}><Icon name="close"/></button></div>
    <div className="question-card reveal"><div className="question-meta"><span>Single correct answer</span><span><Icon name="clock" size={16}/> 01:42</span></div><h2>A parallel plate capacitor has a capacitance of 5 μF. If the distance between its plates is doubled, what is its new capacitance?</h2>
      <div className="answers">{['10 μF','5 μF','2.5 μF','1.25 μF'].map((a,i)=><button key={a} className={`${answer===i?'selected':''} ${answer!==null&&i===2?'correct':''}`} onClick={()=>setAnswer(i)}><span>{String.fromCharCode(65+i)}</span>{a}{answer!==null&&i===2&&<Icon name="check"/>}</button>)}</div>
      {answer!==null && <div className="explanation"><strong>Well reasoned.</strong><p>Capacitance is inversely proportional to the distance between the plates. Doubling the distance halves the capacitance to 2.5 μF.</p></div>}
      <div className="quiz-actions"><button className="text-btn">Save for later</button><button className="primary" disabled={answer===null} onClick={exit}>{answer===null?'Check answer':'Continue'} <Icon name="arrow" size={17}/></button></div>
    </div>
  </section>
}

function Tutor({chat,message,setMessage,send}:{chat:string[];message:string;setMessage:(s:string)=>void;send:()=>void}) {
  return <section className="tutor-layout">
    <div className="tutor-copy reveal"><span className="eyebrow">Personal AI tutor</span><h1>Clarity, exactly<br/>when you need it.</h1><p>Ask questions, untangle difficult concepts, or build a study plan from where you are now.</p>
      <div className="suggestions">{['Explain Gauss’s law intuitively','Quiz me on organic chemistry','Build a 7-day revision plan'].map(x=><button key={x} onClick={()=>setMessage(x)}>{x}<Icon name="arrow" size={15}/></button>)}</div>
    </div>
    <div className="chat-panel reveal delay-2">
      <div className="chat-head"><div className="ai-avatar"><Icon name="spark" size={20}/></div><div><strong>ExamPrep AI</strong><span><i/> Ready to help</span></div></div>
      <div className="messages"><div className="ai-message"><p>Good evening, Arjun. What would you like to understand better today?</p></div>{chat.map((x,i)=><div className="user-message" key={i}><p>{x}</p></div>)}</div>
      <div className="composer"><input value={message} onChange={e=>setMessage(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()} placeholder="Ask anything about your syllabus..."/><button onClick={send} aria-label="Send"><Icon name="send" size={18}/></button></div>
      <small className="disclaimer">AI can make mistakes. Verify important exam information.</small>
    </div>
  </section>
}

function Library() {
  return <><section className="hero simple reveal"><div><span className="eyebrow">Personal knowledge base</span><h1>Your library.</h1><p>Everything worth returning to, thoughtfully organized.</p></div><button className="primary"><Icon name="note" size={17}/> New note</button></section>
    <div className="library-tabs"><button className="active">Saved questions <span>18</span></button><button>Notes <span>12</span></button><button>Highlights <span>34</span></button></div>
    <section className="saved-grid">{[
      ['Physics','Electric potential due to a system of charges','Saved 2 hours ago'],
      ['Mathematics','Properties of definite integrals','Saved yesterday'],
      ['Chemistry','Mechanism of nucleophilic substitution','Saved 3 days ago'],
      ['Biology','Molecular basis of inheritance','Saved 5 days ago'],
    ].map((x,i)=><article className={`saved-card reveal delay-${i+1}`} key={x[1]}><div><span className={`tag t${i}`}>{x[0]}</span><Icon name="bookmark" size={18}/></div><h3>{x[1]}</h3><p>{x[2]}</p><button className="text-btn">Review <Icon name="arrow" size={15}/></button></article>)}</section>
  </>
}

function PreviousYearPapers() {
  const [exam, setExam] = useState('JEE Main')
  const [openPaper, setOpenPaper] = useState<string | null>('2024')
  const exams = ['JEE Main', 'JEE Advanced', 'NEET']
  const papers = [
    { year:'2024', title:'JEE Main 2024', sessions:'January & April sessions', questions:180, solved:124, accuracy:'84%' },
    { year:'2023', title:'JEE Main 2023', sessions:'January & April sessions', questions:180, solved:96, accuracy:'79%' },
    { year:'2022', title:'JEE Main 2022', sessions:'June & July sessions', questions:180, solved:58, accuracy:'76%' },
    { year:'2021', title:'JEE Main 2021', sessions:'All four sessions', questions:270, solved:21, accuracy:'72%' },
    { year:'2020', title:'JEE Main 2020', sessions:'January & September', questions:150, solved:0, accuracy:'—' },
  ]
  return <>
    <section className="hero simple pyq-hero reveal">
      <div><span className="eyebrow">Exam archive</span><h1>Previous year papers.</h1><p>Practice authentic exam questions, understand patterns, and review clear step-by-step solutions.</p></div>
      <div className="pyq-summary"><strong>38</strong><span>Papers available</span></div>
    </section>
    <div className="exam-switcher reveal delay-1">
      {exams.map(x=><button key={x} className={exam===x?'active':''} onClick={()=>setExam(x)}>{x}</button>)}
    </div>
    <section className="pyq-layout">
      <div className="paper-list">
        <div className="section-head reveal delay-2"><div><span className="eyebrow">{exam} archive</span><h2>Year-wise papers</h2></div><span className="paper-count">2015—2024</span></div>
        {papers.map((paper,i)=>{
          const isOpen=openPaper===paper.year
          return <article className={`paper-card reveal delay-${Math.min(i+1,4)} ${isOpen?'open':''}`} key={paper.year}>
            <button className="paper-main" onClick={()=>setOpenPaper(isOpen?null:paper.year)}>
              <span className="paper-year">{paper.year}</span>
              <span className="paper-info"><strong>{paper.title}</strong><small>{paper.sessions} · {paper.questions} questions</small></span>
              <span className="paper-progress"><i style={{width:`${paper.solved/paper.questions*100}%`}}/><small>{paper.solved}/{paper.questions} solved</small></span>
              <span className={`chevron ${isOpen?'up':''}`}><Icon name="chevron" size={18}/></span>
            </button>
            <div className="paper-details">
              <div className="paper-stats"><div><strong>{paper.accuracy}</strong><span>Accuracy</span></div><div><strong>{paper.solved}</strong><span>Solved</span></div><div><strong>3h</strong><span>Duration</span></div></div>
              <div className="paper-actions"><button className="secondary"><Icon name="note" size={16}/> View questions</button><button className="primary"><Icon name="play" size={15}/> Start full paper</button></div>
              <div className="solution-preview"><span className="eyebrow">Solutions included</span><p>Detailed step-by-step solutions, alternate methods, difficulty analysis, and topic mapping for every question.</p></div>
            </div>
          </article>
        })}
      </div>
      <aside className="pyq-aside reveal delay-3">
        <span className="eyebrow">Your PYQ progress</span><div className="big-stat">68<small>%</small></div><p>274 of 405 questions attempted</p>
        <div className="progress large"><i style={{width:'68%'}}/></div>
        <div className="aside-row"><span>Physics</span><strong>82%</strong></div><div className="aside-row"><span>Chemistry</span><strong>74%</strong></div><div className="aside-row"><span>Mathematics</span><strong>67%</strong></div>
        <div className="insight"><Icon name="spark" size={18}/><p><strong>Smart insight</strong>Your strongest PYQ topic is Electrostatics. Revise Rotation before your next paper.</p></div>
      </aside>
    </section>
  </>
}

function Profile({onLogout}:{onLogout:()=>void}) {
  return <><section className="profile-hero reveal"><div className="avatar xl">AK</div><div><span className="eyebrow">Student profile</span><h1>Arjun Kumar</h1><p>Preparing for JEE Advanced · Exam in 124 days</p></div><button className="secondary">Edit profile</button></section>
    <section className="profile-grid">
      <div className="panel reveal"><span className="eyebrow">Overall performance</span><div className="big-stat">78<small>%</small></div><p>Accuracy across 1,248 questions</p><div className="progress large"><i style={{width:'78%'}}/></div></div>
      <div className="panel reveal delay-1"><span className="eyebrow">Study overview</span>{[['Current streak','12 days'],['Total focus time','148 hours'],['Lessons completed','86'],['Questions solved','1,248']].map(x=><div className="setting-row" key={x[0]}><span>{x[0]}</span><strong>{x[1]}</strong></div>)}</div>
      <div className="panel settings reveal delay-2"><span className="eyebrow">Preferences</span>{['Exam & syllabus','Study reminders','Appearance','Notifications'].map(x=><button className="setting-row" key={x}><span>{x}</span><Icon name="arrow" size={16}/></button>)}<button className="logout" onClick={onLogout}>Sign out</button></div>
    </section>
  </>
}

function Login({onContinue,onSignup}:{onContinue:()=>void;onSignup:()=>void}) {
  return <main className="login-page">
    <div className="login-art"><div className="login-brand"><span className="brand-mark"><Icon name="spark" size={18}/></span> EXAMPREP</div><div className="login-quote"><span className="eyebrow">Learn with intention</span><h1>Turn focused effort<br/>into exceptional results.</h1><p>Adaptive practice, clear explanations, and a study rhythm built around you.</p></div><div className="ambient-ring r1"/><div className="ambient-ring r2"/></div>
    <div className="login-form page-enter"><div className="login-mobile-brand"><span className="brand-mark"><Icon name="spark" size={17}/></span> EXAMPREP</div><span className="eyebrow">Welcome back</span><h2>Continue your progress.</h2><p>Enter your details to access your workspace.</p><label>Email address<input type="email" defaultValue="arjun@example.com"/></label><label>Password<input type="password" defaultValue="password"/></label><div className="form-row"><label className="check-label"><input type="checkbox" defaultChecked/> Remember me</label><button className="text-btn">Forgot password?</button></div><button className="primary wide" onClick={onContinue}>Sign in <Icon name="arrow" size={17}/></button><div className="divider"><span>or</span></div><button className="secondary wide" onClick={onContinue}>Continue with Google</button><p className="signup-copy">New to ExamPrep? <button onClick={onSignup}>Create an account</button></p></div>
  </main>
}

function Signup({onContinue,onLogin}:{onContinue:()=>void;onLogin:()=>void}) {
  return <main className="login-page">
    <div className="login-art signup-art"><div className="login-brand"><span className="brand-mark"><Icon name="spark" size={18}/></span> EXAMPREP</div><div className="login-quote"><span className="eyebrow">Your preparation, elevated</span><h1>Build a study system<br/>that gets results.</h1><p>One focused workspace for lessons, previous year papers, adaptive quizzes, notes, and AI guidance.</p></div><div className="ambient-ring r1"/><div className="ambient-ring r2"/></div>
    <div className="login-form signup-form page-enter"><div className="login-mobile-brand"><span className="brand-mark"><Icon name="spark" size={17}/></span> EXAMPREP</div><span className="eyebrow">Create your account</span><h2>Start preparing smarter.</h2><p>Tell us a little about you to personalize your workspace.</p><div className="name-fields"><label>First name<input defaultValue="Arjun"/></label><label>Last name<input defaultValue="Kumar"/></label></div><label>Email address<input type="email" placeholder="you@example.com"/></label><label>Target exam<select defaultValue="JEE Advanced"><option>JEE Advanced</option><option>JEE Main</option><option>NEET</option></select></label><label>Password<input type="password" placeholder="At least 8 characters"/></label><label className="terms"><input type="checkbox" defaultChecked/> I agree to the Terms and Privacy Policy</label><button className="primary wide" onClick={onContinue}>Create account <Icon name="arrow" size={17}/></button><p className="signup-copy">Already have an account? <button onClick={onLogin}>Sign in</button></p></div>
  </main>
}

export default App
