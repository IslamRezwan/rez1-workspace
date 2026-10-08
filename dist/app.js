const root = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
function updateThemeButton() {
  const dark = root.dataset.theme === 'dark';
  themeToggle.setAttribute('aria-label', `Switch to ${dark ? 'light' : 'dark'} theme`);
  themeToggle.setAttribute('title', themeToggle.getAttribute('aria-label'));
  themeToggle.querySelector('.theme-label').textContent = dark ? 'Light' : 'Dark';
  document.querySelector('meta[name="theme-color"]').content = dark ? '#111216' : '#ffffff';
}
updateThemeButton();
themeToggle.addEventListener('click', () => {
  root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  try { localStorage.setItem('rez1-theme', root.dataset.theme); } catch (_) {}
  updateThemeButton();
});
const menuToggle = document.getElementById('menu-toggle');
const mobileNav = document.getElementById('mobile-nav');
menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  mobileNav.hidden = !open;
});
mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  mobileNav.hidden = true; menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open navigation');
}));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !mobileNav.hidden) {
    mobileNav.hidden = true; menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation'); menuToggle.focus();
  }
});
const examples = {
  bug: { kicker:'EXAMPLE / BUG FIX', title:'Fix email validation', brief:'Reject invalid email addresses before saving a user profile. Preserve the existing behavior for valid addresses.', file:'src/profile.ts', test:'tests/profile.test.ts', scope:'profile.ts and one regression test', activity:[['Read the save path','Inspect src/profile.ts and existing coverage.'],['Propose a bounded change','Add an early validation guard.'],['Request a validation command','Developer approval would be required before execution.'],['Prepare a review','Keep the patch and actual check results together.']], diff:[['context','  export function saveProfile(email: string) {'],['deletion','−   return persist(email);'],['addition','+   if (!isValidEmail(email)) {'],['addition','+     throw new Error("Invalid email");'],['addition','+   }'],['addition','+   return persist(email);'],['context','  }']], additions:'+4 −1' },
  tests: { kicker:'EXAMPLE / TEST COVERAGE', title:'Add regression tests', brief:'Capture the empty and malformed email cases in the profile test suite. Keep the behavior of the implementation unchanged.', file:'tests/profile.test.ts', test:'Profile validation suite', scope:'tests only', activity:[['Read the existing tests','Identify the test runner and current assertions.'],['Propose edge-case coverage','Include an empty email and malformed address.'],['Request the focused test suite','The example does not run any real tests.'],['Present tests for review','Explain what the new assertions protect.']], diff:[['addition','+ it.each(["", "invalid-email"])('],['addition','+   "rejects invalid email %s",'],['addition','+   (email) => {'],['addition','+     expect(() => saveProfile(email))'],['addition','+       .toThrow("Invalid email");'],['addition','+   }'],['addition','+ );']], additions:'+7 −0' },
  refactor: { kicker:'EXAMPLE / REFACTOR', title:'Extract a validation helper', brief:'Move repeated profile validation into a named helper. Preserve the existing valid and invalid input behavior, and keep the change small enough to review.', file:'src/profile.ts', test:'Existing profile tests', scope:'one helper and its callers', activity:[['Inspect repeated logic','Find the validation branch and its callers.'],['Extract a named helper','Keep the implementation behavior equivalent.'],['Request existing checks','Ask before executing repository commands.'],['Explain the proposed changes','Separate structural changes from behavior changes.']], diff:[['deletion','− if (!email.includes("@")) {'],['addition','+ if (!isValidEmail(email)) {'],['context','    throw new Error("Invalid email");'],['context','  }'],['addition','+ function isValidEmail(value: string) {'],['addition','+   return value.includes("@");'],['addition','+ }']], additions:'+4 −1' }
};
let activeTask = 'bug';
let activeView = 'task';
let walkthroughTimers = [];
const taskTabs = [...document.querySelectorAll('[data-task]')];
const viewTabs = [...document.querySelectorAll('[data-view]')];
const demoContent = document.getElementById('demo-content');
const walkthroughButton = document.getElementById('walkthrough');
function node(tag, text, className) {
  const el = document.createElement(tag);
  if (text !== undefined) el.textContent = text;
  if (className) el.className = className;
  return el;
}
function stopWalkthrough() {
  walkthroughTimers.forEach(clearTimeout); walkthroughTimers = [];
  walkthroughButton.textContent = 'Walk through this example';
}
function renderExample() {
  const sample = examples[activeTask];
  document.getElementById('demo-kicker').textContent = sample.kicker;
  document.getElementById('demo-title').textContent = sample.title;
  document.getElementById('task-panel').setAttribute('aria-labelledby', `task-${activeTask}`);
  demoContent.setAttribute('aria-labelledby', `view-${activeView}`);
  demoContent.replaceChildren();
  if (activeView === 'task') {
    const brief=node('div',undefined,'task-brief');
    brief.append(node('span','THE TASK','overline'),node('p',sample.brief));
    const pair=node('div',undefined,'brief-pair');
    [['SCOPE',sample.file],['VALIDATION',sample.test]].forEach(([label,value])=>{
      const col=node('div'); col.append(node('span',label,'overline'),node('strong',value)); pair.append(col);
    });
    brief.append(pair);
    const note=node('div',undefined,'approval-note');
    note.append(node('span','i','note-mark'),node('span','The design pauses for approval before running commands.')); brief.append(note); demoContent.append(brief);
  } else if (activeView === 'activity') {
    const list=node('ol',undefined,'activity-list');
    sample.activity.forEach(([title,description],i)=>{
      const row=node('li'); const entry=node('div');
      entry.append(node('strong',title),node('small',description));
      row.append(node('time',`00:0${i+1}`),entry); list.append(row);
    }); demoContent.append(list);
  } else {
    const head=node('div',sample.file,'diff-head'); head.append(node('span',sample.additions));
    const pre=node('pre',undefined,'diff-code'); const code=node('code');
    sample.diff.forEach(([type,line])=>code.append(node('span',line,type))); pre.append(code);
    demoContent.append(head,pre,node('p',`Illustrative patch · ${sample.scope}. Actual checks would appear after execution.`,'diff-note'));
  }
  taskTabs.forEach(tab=>{const selected=tab.dataset.task===activeTask; tab.classList.toggle('selected',selected); tab.setAttribute('aria-selected',String(selected)); tab.tabIndex=selected?0:-1;});
  viewTabs.forEach(tab=>{const selected=tab.dataset.view===activeView; tab.classList.toggle('selected',selected); tab.setAttribute('aria-selected',String(selected)); tab.tabIndex=selected?0:-1;});
}
function wireTabs(tabs, choose, orientation) {
  tabs.forEach((tab,index)=>{
    tab.addEventListener('click',()=>choose(tab));
    tab.addEventListener('keydown',event=>{
      let next;
      if(event.key === (orientation==='vertical'?'ArrowDown':'ArrowRight')) next=(index+1)%tabs.length;
      if(event.key === (orientation==='vertical'?'ArrowUp':'ArrowLeft')) next=(index+tabs.length-1)%tabs.length;
      if(event.key==='Home') next=0;
      if(event.key==='End') next=tabs.length-1;
      if(next!==undefined){event.preventDefault();choose(tabs[next]);tabs[next].focus();}
    });
  });
}
wireTabs(taskTabs,tab=>{stopWalkthrough();activeTask=tab.dataset.task;activeView='task';renderExample();},'vertical');
wireTabs(viewTabs,tab=>{stopWalkthrough();activeView=tab.dataset.view;renderExample();},'horizontal');
walkthroughButton.addEventListener('click',()=>{
  if(walkthroughTimers.length){stopWalkthrough();return;}
  activeView='task';renderExample();walkthroughButton.textContent='Stop walkthrough';
  const delay=window.matchMedia('(prefers-reduced-motion: reduce)').matches?400:1400;
  walkthroughTimers.push(setTimeout(()=>{activeView='activity';renderExample();},delay));
  walkthroughTimers.push(setTimeout(()=>{activeView='changes';renderExample();stopWalkthrough();},delay*2));
});
document.querySelectorAll('[data-env]').forEach(button=>button.addEventListener('click',()=>{
  document.querySelectorAll('[data-env]').forEach(item=>{const selected=item===button;item.classList.toggle('selected',selected);item.setAttribute('aria-pressed',String(selected));});
  document.getElementById('environment-note').textContent=button.dataset.env==='local'?'Local plan: work in an isolated Git worktree.':'Cloud roadmap: disposable remote environments, after the local MVP.';
}));
renderExample();
document.getElementById('copy-email').addEventListener('click',async()=>{
  const status=document.getElementById('copy-status');
  try { await navigator.clipboard.writeText('contact@rez1.dev'); status.textContent='Email address copied.'; }
  catch(_) { status.textContent='Copy this address: contact@rez1.dev'; }
});
document.getElementById('contact-form').addEventListener('submit',event=>{
  event.preventDefault();
  const subject=`rez1 workspace — ${document.getElementById('contact-subject').value}`;
  const body=document.getElementById('contact-message').value.trim();
  const provider=document.getElementById('contact-provider').value;
  if(!body) return;
  let url;
  if(provider==='gmail') url=`https://mail.google.com/mail/?view=cm&fs=1&to=contact%40rez1.dev&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  else if(provider==='outlook') url=`https://outlook.live.com/mail/0/deeplink/compose?to=contact%40rez1.dev&subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  else url=`mailto:contact@rez1.dev?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  if(provider==='mailto') window.location.href=url;
  else {
    const draft=window.open(url,'_blank');
    if(draft) draft.opener=null;
    else { document.getElementById('copy-status').textContent='The browser blocked a new tab. Allow pop-ups for this site or copy the email address.'; }
  }
});
