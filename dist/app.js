const steps = [
  ['REPOSITORY / LOCAL FIRST','Start where your code lives.','The first milestone is opening a local Git repository in a dedicated task workspace. Cloud environments will come later, after the local workflow is dependable.','Planned: repository selection and an isolated branch for each task.'],
  ['TASK / CLEAR INTENT','Describe the outcome.','Assign one concrete task, such as adding validation or explaining an unfamiliar module. The agent should have a clear objective and a bounded set of tools.','Planned: task instructions, repository context, and one agent integration.'],
  ['EXECUTION / VISIBLE ACTIVITY','See how the work gets done.','Follow the files inspected, edits proposed, and checks run. Commands that need approval should pause for the developer before execution.','Planned: task logs, command approvals, and test output.'],
  ['REVIEW / HUMAN DECISION','Keep the final decision.','Inspect the proposed changes and their test results before accepting them. The first release will focus on a useful diff review instead of automatic merging.','Planned: file diffs and an explicit accept-or-discard workflow.']
];
const tabs = [...document.querySelectorAll('[data-step]')];
function selectStep(index, focus = false) {
  tabs.forEach((tab, i) => { tab.classList.toggle('selected', i === index); tab.setAttribute('aria-selected', String(i === index)); tab.tabIndex = i === index ? 0 : -1; });
  ['panel-label','panel-title','panel-copy','panel-note'].forEach((id, i) => { document.getElementById(id).textContent = steps[index][i]; });
  document.getElementById('step-panel').setAttribute('aria-labelledby', tabs[index].id);
  if (focus) tabs[index].focus();
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectStep(index));
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowDown') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowUp') next = (index + tabs.length - 1) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next !== undefined) { event.preventDefault(); selectStep(next, true); }
  });
});
