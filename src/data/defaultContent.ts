import type { Section, DesignPerson } from '../types';

export const designCDO: DesignPerson[] = [
  { name: 'Eric Kabisch', role: 'Chief Design Officer', photo: 'people/eric-kabisch.png' },
];

export const designDirectors: DesignPerson[] = [
  { name: 'Avi Ashkenazi', role: 'Senior Director, Product Design', photo: 'people/avi-ashkenazi.png' },
  { name: 'Muhammed Salim', role: 'Senior Director, Product Design', photo: 'people/muhammed-salim.png' },
  { name: 'Travis Smith', role: 'Senior Director, Product Design', photo: 'people/travis-smith.png' },
];

export const designGroupManagers: DesignPerson[] = [
  { name: 'Jonathan Willington', role: 'Group Product Design Manager', team: 'Deel HR + Engage', photo: 'people/jon-willington.png' },
  { name: 'Jose Castillo', role: 'Group Product Design Manager', team: 'Self-Serve Payroll', photo: 'people/jose-castillo.png' },
  { name: 'Marc Aquino', role: 'Group Product Design Manager', team: 'Payroll & Payroll Processing', photo: 'people/marc-aquino.png' },
  { name: 'Sasha Grishin', role: 'Group Product Design Manager', team: 'Fintech', photo: 'people/sasha-grishin.png' },
];

export const designLeads: DesignPerson[] = [
  { name: 'Aleksandr Loviagin', role: 'Lead Product Designer', team: 'Platform', photo: 'people/alex-loviagin.png' },
  { name: 'Andra Cimpan', role: 'Lead Product Designer', team: 'Payroll Lifecycle', photo: 'people/andra-cimpan.png' },
  { name: 'Gavin Elliott', role: 'Lead Product Designer', photo: 'people/gavin-elliott.png' },
  { name: 'Kunal Drego', role: 'Lead Product Designer', photo: 'people/kunal-drego.png' },
  { name: 'Lucas Pazin', role: 'Lead Product Designer', team: 'EOR + Contractors & Contract Verticals', photo: 'people/lucas-pazin.png' },
  { name: 'Melih Bozok', role: 'Lead Product Designer', team: 'Benefits', photo: 'people/melih-bozok.png' },
  { name: 'Thais Souza', role: 'Lead Product Designer', team: 'Contracts and Deel IT', photo: 'people/thais-souza.png' },
];

export const executives = [
  { name: 'Alex Bouaziz', role: 'CEO & co-founder' },
  { name: 'Shuooo Wang', role: 'CRO & co-founder' },
  { name: 'Daniel Westgarth', role: 'COO' },
  { name: 'Yaron Lavi', role: 'CTO' },
];

export const sections: Section[] = [
  {
    id: 'line-manager-actions',
    title: 'Line Manager Actions',
    icon: '',
    description: 'Tasks your line manager will complete to help you get started.',
    subsections: [
      {
        title: 'Your first 1:1',
        items: [
          { id: 'lm-1', text: 'Set up a 1:1 welcome call' },
          { id: 'lm-2', text: 'Inform you about the structure of the design org', link: 'https://www.figma.com/design/yiK7sVZQvINCfZImScl1Dn/Design-Org-%26-teams?node-id=4307-2261', linkText: 'design org' },
          { id: 'lm-3', text: 'Inform you about your product team' },
          { id: 'lm-4', text: 'Inform you about expectations for your first week' },
        ],
      },
      {
        title: 'Calendar',
        items: [
          { id: 'lm-5', text: 'Invite you to any recurring meetings for your product team' },
          { id: 'lm-6', text: 'Invite you to any group-level design meetings' },
          { id: 'lm-7', text: 'Invite you to the Thursday design show & tell (and to prepare a short introduction!)' },
        ],
      },
      {
        title: 'Slack',
        items: [
          { id: 'lm-8', text: 'Invite and announce you in the #product-department & #designers channels' },
          { id: 'lm-9', text: 'Invite and announce you in the relevant team + vertical channels' },
          { id: 'lm-10', text: 'Invite you to all designer Slack channels (see list below)' },
        ],
      },
    ],
  },
  {
    id: 'first-actions',
    title: 'Your 1st Actions',
    icon: '',
    subsections: [
      {
        title: 'Required Training',
        items: [
          { id: 'nj-1', text: 'Complete all mandatory training in Deel Learning (you\'ll receive an email invite)' },
          { id: 'nj-2', text: 'Attend the orientation call from Deel members' },
        ],
      },
      {
        title: 'Update your profile',
        items: [
          { id: 'fa-1', text: 'Slack - Add photo, your role and product team name. Optionally add your phone number.' },
          { id: 'fa-2', text: 'Gmail - Add your photo (preferably the same you\'ve used for Slack)' },
          { id: 'fa-3', text: 'Deel - Ensure all your personal information is fully set up on your worker account' },
        ],
      },
      {
        title: 'Your team',
        items: [
          { id: 'fa-4', text: 'Note: We have weekly company-wide meetings on Thursday 4 PM GMT (UK time)' },
          { id: 'fa-5', text: 'Speak to your PM, familiarise yourself with your team\'s purpose, definition of success, and KPIs' },
          { id: 'fa-6', text: 'Review your team\'s Jira board (and bookmark)' },
          { id: 'fa-7', text: 'Review Deel and your team\'s Looker (and bookmark)' },
          { id: 'fa-8', text: 'Join your team\'s holiday calendar - check in with the PM on how to do this' },
        ],
      },
    ],
  },
  {
    id: 'slack',
    title: 'Slack',
    icon: '',
    description: 'Ensure you have access to all these channels.',
    subsections: [
      {
        title: 'General Slack Channels',
        items: [
          { id: 'sl-1', text: '#general - Company-wide announcements', link: 'https://deel.enterprise.slack.com/archives/C0HHLE58V', linkText: 'Open' },
          { id: 'sl-2', text: '#ask-it - If you are experiencing IT issues', link: 'https://deel.enterprise.slack.com/archives/C0786V3LPJA', linkText: 'Open' },
          { id: 'sl-3', text: '#access-requests - If you need additional access to software', link: 'https://deel.enterprise.slack.com/archives/C027ZKC40AV', linkText: 'Open' },
          { id: 'sl-4', text: '#ask-procurement-team - If you need WeWork access or additional equipment', link: 'https://deel.enterprise.slack.com/archives/C03TQ8VMQCB', linkText: 'Open' },
          { id: 'sl-5', text: '#random - Exactly what you would think', link: 'https://deel.enterprise.slack.com/archives/C023HA34140', linkText: 'Open' },
          { id: 'sl-6', text: '#deel-travel - Travel questions + stories', link: 'https://deel.enterprise.slack.com/archives/C02CV6PUE80', linkText: 'Open' },
        ],
      },
      {
        title: 'Designer Slack Channels',
        items: [
          { id: 'sl-7', text: '#brand-product-creatives - All product + brand designers', link: 'https://deel.enterprise.slack.com/archives/C03C9G9378U', linkText: 'Open' },
          { id: 'sl-8', text: '#deel-ui - Engineering focused topics relating to Deel-UI components', link: 'https://deel.enterprise.slack.com/archives/CV1P0CXKP', linkText: 'Open' },
          { id: 'sl-9', text: '#design-knowledge - Design discourse discussions for designers', link: 'https://deel.enterprise.slack.com/archives/C023HA34140', linkText: 'Open' },
          { id: 'sl-10', text: '#design-quality-assurance - Design + implementation inconsistencies', link: 'https://deel.enterprise.slack.com/archives/C049BPWU69F', linkText: 'Open' },
          { id: 'sl-11', text: '#ds-announcements - Design System updates', link: 'https://deel.enterprise.slack.com/archives/C05HJPDKTP1', linkText: 'Open' },
          { id: 'sl-12', text: '#design-questions - Place to ask questions - e.g. "Have you seen a Figma file for X?"', link: 'https://deel.enterprise.slack.com/archives/C0998D4K6DA', linkText: 'Open' },
          { id: 'sl-13', text: '#product-go-to-market - New releases from all product teams', link: 'https://deel.enterprise.slack.com/archives/C027ZKC40AV', linkText: 'Open' },
        ],
      },
    ],
  },
  {
    id: 'software',
    title: 'Software We Use',
    icon: '',
    description: 'If you need additional access or any default access is missing, please ask in #access-requests.',
    subsections: [
      {
        title: 'Core Tools',
        items: [
          { id: 'sw-1', text: '**Figma** - Our design tool, use your Deel email', link: 'https://www.figma.com/', linkText: 'Figma', icon: 'logos/figma.svg' },
          { id: 'sw-2', text: '**Slack** - Register via SSO once your email is set up', icon: 'logos/slack.svg' },
          { id: 'sw-3', text: '**Jira** - Our sprint planning and management tool', link: 'https://letsdeel.atlassian.net/', linkText: 'Jira', icon: 'logos/jira.svg' },
          { id: 'sw-4', text: '**Deel Knowledge Base** - Our internal wiki page/knowledge center', link: 'https://wiki.deel.network/', linkText: 'Wiki', icon: 'logos/deel.svg' },
          { id: 'sw-5', text: '**Looker** - Data and reporting tool used across all product teams', link: 'https://deel.cloud.looker.com/login', linkText: 'Looker', icon: 'logos/looker.svg' },

          { id: 'sw-7', text: '**Zoom** - Used for weekly all hands meeting', link: 'https://zoom.us/', linkText: 'Zoom', icon: 'logos/zoom.svg' },
          { id: 'sw-8', text: '**OpenReplay** - All the events & user videos', link: 'https://app.openreplay.com/login', linkText: 'OpenReplay', icon: 'logos/openreplay.svg' },
          { id: 'sw-9', text: '**Amplitude** - Tracking FE events', link: 'https://app.eu.amplitude.com/analytics/deel/home', linkText: 'Amplitude', icon: 'logos/amplitude.svg' },
        ],
      },
    ],
  },
  {
    id: 'learn-deel',
    title: 'Learn Deel',
    icon: '',
    description: 'Understand Deel\'s environments and deepen your product knowledge.',
    subsections: [
      {
        title: 'Watch',
        items: [
          { id: 'env-1', text: 'Watch the environments overview video', link: 'https://drive.google.com/file/d/1Ka905v28hitbZwElwKsITMeS6BFlObQI/view', linkText: 'Watch video' },
          { id: 'learn-1', text: 'Testing at Deel as a Product Designer', link: 'https://drive.google.com/file/d/1yNOdjR4ni-XiRAc6rVzGRgIN6ICeR0y-/view', linkText: 'Watch video' },
        ],
      },
      {
        title: 'Key concepts to understand',
        readOnly: true,
        items: [
          { id: 'env-2', text: '**The Client App** - Where clients login to run their business through Deel (app.deel.com)' },
          { id: 'env-3', text: '**The Worker App** - Where workers log in (contractor app, direct employee app, PEO employee app, etc.)' },
          { id: 'env-4', text: '**Admin App (Admin Dashboard)** - Where Deel agents login to assist clients, and where Dev/Design/Eng/Product debug issues', link: 'https://admin.deel.network/', linkText: 'Admin' },
          { id: 'env-5', text: '**Production** - What real clients and workers see', link: 'https://app.letsdeel.com/', linkText: 'app.letsdeel.com' },
          { id: 'env-6', text: '**Dev** - Where new functionality is pushed (anonymised DB refreshed every 12 weeks)', link: 'https://dev.deel.wtf/', linkText: 'dev.deel.wtf' },
          { id: 'env-7', text: '**Giger** - Local branches for QA before pushing to dev (e.g., des-3332.deel.wtf)' },
          { id: 'env-8', text: '**Demo** - Mainly for sales demos to prospective clients', link: 'https://demo.letsdeel.com/', linkText: 'demo.letsdeel.com' },
        ],
      },
      {
        title: 'Product knowledge',
        items: [
          { id: 'learn-2', text: 'Explore Deel Blog', link: 'https://www.deel.com/blog', linkText: 'Deel Blog' },
          { id: 'learn-3', text: 'Follow Deel LinkedIn', link: 'https://www.linkedin.com/company/deel/posts/?feedView=all', linkText: 'LinkedIn' },
          { id: 'learn-4', text: 'Review Deel Global Hiring Guide', link: 'https://www.deel.com/global-hiring-guide', linkText: 'Hiring Guide' },
          { id: 'learn-5', text: 'Explore Deel Community', link: 'https://community.deel.com/', linkText: 'Community' },
          { id: 'learn-6', text: 'Watch Deel Worker types video', link: 'https://www.loom.com/share/429357a1b2fe4b4280776cb831db442e?sid=ca226d1d-e6be-4cae-92f7-73a3e4fd274d', linkText: 'Worker types' },
          { id: 'learn-7', text: 'Review Deel Help Center', link: 'https://help.letsdeel.com/hc/en-gb', linkText: 'Help Center' },
          { id: 'learn-8', text: 'Review Global payroll knowledge hub', link: 'https://wiki.deel.network/i/40904', linkText: 'Payroll hub' },
        ],
      },
      {
        title: 'Processes',
        items: [
          { id: 'learn-9', text: 'Learn Go to Market (GTM) Process', link: 'https://wiki.deel.network/i/4110', linkText: 'GTM Process' },
          { id: 'learn-10', text: 'Understand how documentation should work', link: 'https://www.figma.com/file/17arHKV6dMgCVEociNhfSo/Design-Org.-%2FTeam-News-%26-Updates?type=design&node-id=1%3A2&mode=design', linkText: 'Documentation' },
          { id: 'learn-11', text: 'Test our internal AI Alicia', link: 'https://admin.deel.network/alicia', linkText: 'Deel IQ Alicia' },
          { id: 'learn-12', text: 'Read our Sales collateral', link: 'https://wiki.deel.network/i/8179', linkText: 'Sales collateral' },
          { id: 'learn-13', text: 'Review our career ladder for Product Design', link: 'https://docs.google.com/spreadsheets/d/1ffvSvXTWb38-BFeDm3Ui1sbb1yxBd2EJeGsuk1STpfY/edit?gid=890316881#gid=890316881', linkText: 'Career ladder' },
        ],
      },
    ],
  },
  {
    id: 'design-system',
    title: 'Design System',
    icon: '',
    description: 'Complete these in order to get familiar with Deel UI.',
    subsections: [
      {
        title: 'Getting started',
        items: [
          { id: 'ds-1', text: 'Read the Overview', link: 'https://ui.deel.com/latest/workflow/overview-CuFB0vei', linkText: 'Overview' },
          { id: 'ds-2', text: 'Learn How to navigate Deel UI', link: 'https://ui.deel.com/latest/workflow/design-system/get-started/navigate-deel-ui-l1081c0A-l1081c0A', linkText: 'Navigate Deel UI' },
          { id: 'ds-3', text: 'Understand our Conventions', link: 'https://ui.deel.com/latest/workflow/design-system/get-started/conventions-kRy2S07X', linkText: 'Conventions' },
        ],
      },
      {
        title: 'Contributing to Deel UI',
        items: [
          { id: 'ds-4', text: 'Learn how to Propose new components', link: 'https://ui.deel.com/latest/workflow/design-system/contribute-to-deel-ui/propose-new-component-qrf9aErN', linkText: 'Propose new components' },
          { id: 'ds-5', text: 'Learn how to Create components', link: 'https://ui.deel.com/latest/workflow/design-system/contribute-to-deel-ui/create-component-DMP6EOIl-DMP6EOIl', linkText: 'Creating components' },
          { id: 'ds-6', text: 'Understand Design advocates', link: 'https://ui.deel.com/latest/workflow/design-system/contribute-to-deel-ui/design-advocates-MnqMf6Wi-MnqMf6Wi', linkText: 'Design advocates' },
          { id: 'ds-7', text: 'Know how to Report bugs', link: 'https://ui.deel.com/latest/workflow/getting-help/overview-sK4HnK1R#search-426c48bd-a436-4a8b-ba97-913d5c1f2fd5', linkText: 'Reporting bugs' },
        ],
      },
      {
        title: 'Staying in sync',
        items: [
          { id: 'ds-8', text: 'Understand Changes and updates', link: 'https://ui.deel.com/latest/workflow/design-system/stay-in-sync/changes-and-updates-mEncSGFT', linkText: 'Changes and updates' },
          { id: 'ds-9', text: 'Learn about the Deprecation process', link: 'https://ui.deel.com/latest/workflow/design-system/stay-in-sync/deprecate-component-FglQ5glt-FglQ5glt', linkText: 'Deprecation process' },
        ],
      },
      {
        title: 'Explore our content',
        items: [
          { id: 'ds-10', text: 'Review Plugins & Widgets', link: 'https://ui.deel.com/latest/workflow/plugins-and-widgets/make-table-djJXUUqK', linkText: 'Plugins & Widgets' },
          { id: 'ds-11', text: 'Review foundations', link: 'https://ui.deel.com/latest/foundations/overview-wpadJ3lZ', linkText: 'Foundations' },
          { id: 'ds-12', text: 'Review components', link: 'https://ui.deel.com/latest/components/overview-7BkgPXFi', linkText: 'Components' },
          { id: 'ds-13', text: 'Review patterns', link: 'https://ui.deel.com/latest/patterns/overview-MZf8Z06x', linkText: 'Patterns' },
        ],
      },
      {
        title: 'Create your first design',
        items: [
          { id: 'ds-14', text: 'Complete the sample exercise: Create your first design at Deel!', link: 'https://ui.deel.com/1081cad38/p/474eb3-get-started/b/256d0d', linkText: 'Start exercise' },
        ],
      },
    ],
  },
  {
    id: 'design-team',
    title: 'Team',
    icon: '',
    description: 'Meet your team and connect with the design leadership at Deel. We recommend setting up short intro calls within your first week.',
    subsections: [
      {
        title: 'CDO',
        items: [
          { id: 'dt-1', text: 'Connect with **Eric Kabisch** - Chief Design Officer', photo: 'people/eric-kabisch.png' },
        ],
      },
      {
        title: 'Senior Directors',
        items: [
          { id: 'dt-2', text: 'Connect with **Avi Ashkenazi** - Senior Director, Product Design', photo: 'people/avi-ashkenazi.png' },
          { id: 'dt-3', text: 'Connect with **Muhammed Salim** - Senior Director, Product Design', photo: 'people/muhammed-salim.png' },
          { id: 'dt-4', text: 'Connect with **Travis Smith** - Senior Director, Product Design', photo: 'people/travis-smith.png' },
        ],
      },
      {
        title: 'Group Product Design Managers',
        items: [
          { id: 'dt-5', text: 'Connect with **Jonathan Willington** - Group Product Design Manager, Deel HR + Engage', photo: 'people/jon-willington.png' },
          { id: 'dt-6', text: 'Connect with **Jose Castillo** - Group Product Design Manager, Self-Serve Payroll', photo: 'people/jose-castillo.png' },
          { id: 'dt-7', text: 'Connect with **Marc Aquino** - Group Product Design Manager, Payroll & Payroll Processing', photo: 'people/marc-aquino.png' },
          { id: 'dt-8', text: 'Connect with **Sasha Grishin** - Group Product Design Manager, Fintech', photo: 'people/sasha-grishin.png' },
        ],
      },
      {
        title: 'Lead Product Designers',
        items: [
          { id: 'dt-9', text: 'Connect with **Aleksandr Loviagin** - Lead Product Designer, Platform', photo: 'people/alex-loviagin.png' },
          { id: 'dt-10', text: 'Connect with **Andra Cimpan** - Lead Product Designer, Payroll Lifecycle', photo: 'people/andra-cimpan.png' },
          { id: 'dt-11', text: 'Connect with **Gavin Elliott** - Lead Product Designer', photo: 'people/gavin-elliott.png' },
          { id: 'dt-12', text: 'Connect with **Kunal Drego** - Lead Product Designer', photo: 'people/kunal-drego.png' },
          { id: 'dt-13', text: 'Connect with **Lucas Pazin** - Lead Product Designer, EOR + Contractors & Contract Verticals', photo: 'people/lucas-pazin.png' },
          { id: 'dt-14', text: 'Connect with **Melih Bozok** - Lead Product Designer, Benefits', photo: 'people/melih-bozok.png' },
          { id: 'dt-15', text: 'Connect with **Thais Souza** - Lead Product Designer, Contracts and Deel IT', photo: 'people/thais-souza.png' },
        ],
      },
      {
        title: 'Design Systems',
        items: [
          { id: 'dt-16', text: 'Connect with **Pantelis Petmezas** - Senior Product Designer, Design Systems' },
        ],
      },
      {
        title: 'Deel Executives',
        readOnly: true,
        items: [
          { id: 'exec-1', text: '**Alex Bouaziz** - CEO & co-founder' },
          { id: 'exec-2', text: '**Shuooo Wang** - CRO & co-founder' },
          { id: 'exec-3', text: '**Daniel Westgarth** - COO' },
          { id: 'exec-4', text: '**Yaron Lavi** - CTO' },
        ],
      },
    ],
  },
  {
    id: 'pto',
    title: 'PTO',
    icon: '',
    subsections: [
      {
        title: 'Time Off Setup',
        items: [
          { id: 'pto-1', text: 'Read PTO policies / flexible time off', link: 'https://wiki.deel.network/en/internal/departments/people/deel-team-perks-benefits/deel-team-member-flexible-time-off', linkText: 'PTO policies' },
          { id: 'pto-2', text: 'Read Requesting Time Off guide', link: 'https://wiki.deel.network/en/internal/departments/people/deel-team-perks-benefits/deel-team-member-requesting-time-away', linkText: 'Requesting Time Off' },
          { id: 'pto-3', text: 'Ensure you have access to \'Time Off\' by Deel' },
          { id: 'pto-4', text: 'Add in any planned holiday that you have coming up over the next 6 months' },
          { id: 'pto-5', text: 'Add in any national holidays for your country of work' },
        ],
      },
    ],
  },
  {
    id: 'manual-of-me',
    title: 'Manual of Me',
    icon: '',
    description: 'Help your team get to know you better!',
    subsections: [
      {
        title: 'Create your Manual',
        items: [
          { id: 'mom-1', text: 'Make a copy of the Manual of Me document', link: 'https://docs.google.com/presentation/d/1ChsvYncs3MVrrFsuYgDWxx9ZRYeYdwAjDT3RtPjYso0/edit#slide=id.g2e815faf41f_0_29', linkText: 'Manual of Me template' },
          { id: 'mom-2', text: 'Fill out with your content' },
          { id: 'mom-3', text: 'Speak to your manager to see when the best time to present it to your team will be' },
        ],
      },
    ],
  },
  {
    id: 'feedback',
    title: 'Provide Feedback!',
    icon: '',
    description: 'Let us know what you found effective and what could be improved with your onboarding process!',
    subsections: [
      {
        title: 'Share your feedback',
        items: [
          { id: 'fb-1', text: 'For Design System onboarding feedback: reach out to Pantelis Petmezas' },
          { id: 'fb-2', text: 'For learning modules in Deel Engage: reach out to Jonathan Willington & Kunal Drego' },
          { id: 'fb-3', text: 'For the overall onboarding experience through Deel product: reach out to Laura Foletto & Aleksandr Loviagin' },
          { id: 'fb-4', text: 'For this checklist: Speak to your line manager' },
        ],
      },
    ],
  },
  {
    id: 'other-actions',
    title: 'Other Actions',
    icon: '',
    description: 'Any additional tasks specific to your role or team.',
    subsections: [
      {
        title: 'Custom tasks',
        items: [
          { id: 'other-1', text: 'Add more as required by your team' },
          { id: 'other-2', text: 'Add more as required by your manager' },
        ],
      },
    ],
  },
];

export const defaultOnboardingData = {
  name: 'New Designer',
  startDate: new Date().toISOString().split('T')[0],
  jobTitle: 'Product Designer',
  productVertical: '',
  designGroup: '',
  lineManager: '',
  onboardingBuddy: '',
  customMessage: '',
  teamDesigners: [] as { name: string; team: string }[],
  productTeam: [] as { name: string; role: string }[],
  customTasks: [] as { text: string; link?: string }[],
};
