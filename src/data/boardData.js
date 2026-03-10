/**
 * Static board data based on the Miro board exploration.
 * This will be replaced/augmented by the Miro API export once the token is available.
 * Comments will be populated from the API export.
 */

export const departments = [
  { id: 'membership', name: 'Membership', color: '#2B26A5' },  // Dark Sapphire
  { id: 'camps', name: 'Camps', color: '#004154' },            // Dark Teal
  { id: 'preschool', name: 'Preschool', color: '#3A7182' },    // Medium Teal
  { id: 'fitness', name: 'Fitness & Aquatics', color: '#AF49DF' },  // Dark Coral
  { id: 'finance', name: 'Finance/Accounting', color: '#4640DE' },  // Medium Sapphire
  { id: 'events', name: 'Events & Facilities', color: '#E17440' },  // Medium Lavender
  { id: 'development', name: 'Development', color: '#D34829' },     // Dark Lavender
  { id: 'marketing', name: 'Marketing', color: '#DE9FFC' },         // Medium Coral
  { id: 'shared', name: 'Shared / Organization-Wide', color: '#3A7182' },  // Medium Teal
];

export const systems = [
  // Salesforce (consolidated: Avocado interface for Membership + direct SF for Finance)
  { id: 'salesforce', name: 'Salesforce', department: 'shared', category: 'system',
    showInDepartments: ['membership', 'finance'],
    businessFunction: 'CRM, Registration, & Financial Operations',
    features: [
      // Avocado interface (Membership)
      'Preschool Registration', 'Program Registration', 'Membership Management',
      'Membership Portal', 'Camp Registration', 'Create Prompt Groups', 'Point of Sale',
      // Direct Salesforce (Finance)
      'Refunds & Credits', 'Payment Transfers', 'Account Management', 'Membership Accounts',
      'Data Storage', 'Record Creation', 'Billing Records',
      'Financial Reporting', 'Membership Reporting', 'Product Setup', 'Program Product Creation',
    ],
    avocadoFeatures: [
      'Preschool Registration', 'Program Registration', 'Membership Management',
      'Membership Portal', 'Camp Registration', 'Create Prompt Groups', 'Point of Sale',
    ],
    notes: [
      'Central CRM — used across most departments',
      'Avocado is the primary user-facing interface for membership, camps, preschool, fitness',
      'Avo contract through 2028; but took meetings w/ Daxko and Amilia to see what else is out there',
      'Exploring/figuring out voucher for missed sessions',
      'Permissions get in the way of folks setting programs up in Avocado',
      'No communication between Avo and marketing systems - manually pulling mailing lists',
      'Likes using Cases for these requests!',
      'System not integrated with agency programming calendar',
      'We didn\'t put the staffing structure into place for Salesforce early enough',
      'Finance processes refunds and credit transfers in Avocado/Salesforce',
      'Creates billing records from external systems (1ClassPro, UPace)',
    ],
    comments: [
      { text: 'Form solution is so bad and painful!! Using Formstack, migrating to Monday.com', author: 'Hillary Dale', date: '2025-02-24T08:38:00Z' },
      { text: 'Specifically, no direct links to a form - have to navigate through their account', author: 'Hillary Dale', date: '2025-02-24T08:38:00Z' },
      { text: 'Refunding and moving people from one registration to another requires paper forms to request then finance processes in the system. If no payment has been processed, then the purchase can be refunded by program folks', author: 'Hillary Dale', date: '2025-02-24T08:38:00Z' },
      { text: 'Transfers could result in credits which is one reason why there is some extra control here so credits can\'t be applied to other programming', author: 'Hillary Dale', date: '2025-02-24T08:38:00Z' },
      { text: 'Finance wants a voucher to need to be spent with the same program; sees the value of using across all programs', author: 'Hillary Dale', date: '2025-02-24T08:41:00Z' },
      { text: 'Forms, basically! For Avo programs. Create then assign to an Avo program so registrants can fill out', author: 'Hillary Dale', date: '2025-02-25T10:32:00Z' },
      { text: 'Need to do in the back end, not Avo interface', author: 'Eva Jablow', date: '2025-02-25T10:32:00Z' },
      { text: 'Finance is creating these in Avocado', author: 'Hillary Dale', date: '2025-02-25T10:30:00Z' },
      { text: 'Some membership reporting', author: 'Eva Jablow', date: '2025-02-25T10:30:00Z' },
      { text: 'What is/should be reported from here versus Odoo?', author: 'Hillary Dale', date: '2025-02-25T10:30:00Z' },
    ] },
  { id: 'calendly', name: 'Calendly', department: 'membership', category: 'system',
    businessFunction: 'Tour Scheduling',
    features: ['Tour Scheduling'],
    notes: ['SF Integration available'],
    comments: [] },

  // Camps
  { id: 'campdoc', name: 'CampDoc', department: 'camps', category: 'system',
    businessFunction: 'Camp Forms & Compliance',
    features: ['Camp Forms', 'Form Tool', 'Document Collection', 'Registration Data Management'],
    notes: ['Has an API (but not publicly accessible) — recommends reaching out to sales about custom integrations', 'Looks like they have an integration with TractionRec', 'Does have an integration with My Camp app, but not using', 'Ava is open to building a CampDoc module importing registrations here', 'Manual import registration (bulk) from Avo (historically Josh, probably Matt — Camps Ops Manager)'],
    comments: [
      { text: 'medical forms, vax records, emergency contacts, student history', author: 'Eva Jablow', date: '2025-02-24T08:26:00Z' },
      { text: 'stuff that\'s required for licensing', author: 'Eva Jablow', date: '2025-02-24T08:26:00Z' },
    ] },
  { id: 'my-camp-app', name: 'My Camp App', department: 'camps', category: 'system',
    businessFunction: 'Parent Comms & Calendars',
    features: ['Camp Calendars', 'Parent Comms & Push Notifications', 'Photo Sharing'],
    notes: ['Manual import registration (bulk) from Avo (Matt)'],
    comments: [
      { text: 'Push notifications - late buses, carpool issues, etc.', author: 'Hillary Dale', date: '2025-02-24T08:31:00Z' },
      { text: 'has SMS option', author: 'Hillary Dale', date: '2025-02-24T08:34:00Z' },
    ] },
  { id: 'access-database', name: 'Access Database', department: 'camps', category: 'system',
    businessFunction: 'Registration Data',
    features: ['Registration Data Management'],
    notes: ['All data goes in here for registration management, but can be a pain to keep up to date', 'Dave does this import from multiple sources (Avo, CampDoc, etc)', 'Like the queries you can run to pull info, easier to search and find info'],
    comments: [] },

  // Preschool
  { id: 'storypark', name: 'Storypark', department: 'preschool', category: 'system',
    businessFunction: 'Teacher/Parent Comms',
    features: ['Preschool Comms', 'Teacher/Parent Comms', 'Photo Sharing'],
    notes: ['A couple of integrations but not with relevant tools: Kinder M8, Xap, Kidsoft', 'Exporting registrations from Avo, putting into CampDoc for documents/forms'],
    comments: [
      { text: 'medical forms, vax records, emergency contacts, student history', author: 'Eva Jablow', date: '2025-02-24T08:26:00Z' },
      { text: 'stuff that\'s required for licensing', author: 'Eva Jablow', date: '2025-02-24T08:26:00Z' },
    ] },
  { id: 'whatsapp-preschool', name: 'WhatsApp', department: 'preschool', category: 'system',
    businessFunction: 'Internal Comms',
    features: ['Internal Comms'],
    notes: [],
    comments: [] },

  // Fitness & Aquatics
  { id: 'spivi', name: 'Spivi', department: 'fitness', category: 'system',
    businessFunction: 'Spin Studio Display',
    features: ['Spin & Speed Flex Studio'],
    notes: ['Can set up studio layout so folks can select their favorite bike or heart rate monitor', 'Older system; UPace said they\'d integrate but never happened', 'Lower volume program and most likely folks wouldn\'t revolt if this went away :)'],
    comments: [] },
  { id: 'upace', name: 'UPace (My J App)', department: 'fitness', category: 'system',
    businessFunction: 'Access & Fitness Bookings',
    features: ['Access Management', 'Group Fitness Bookings', 'Court/Lane Bookings', 'Fitness, Access Scans, Kids Club'],
    notes: ['Option for payment processing, but don\'t want to create another POS', 'Schedule in UPace, registration to Avocado, check-in in UPace then that creates the order in Avo so payment processing is in Avo', 'Signed SOP with Avocado about getting payment records from UPace into Avocado; pending SOP from UPace', 'Another option is to buy a class pass in Avocado, then they are redeemed in UPace. Finance didn\'t like because revenue recognition and refund complexity', 'Lots of manual billing, which creates a delay in billing data, which creates confusion!'],
    comments: [
      { text: 'a lot manual billing as a result of this not speaking to Avocado', author: 'Eva Jablow', date: '2025-02-24T08:02:00Z' },
      { text: 'manually charge at end of month for these sessions', author: 'Eva Jablow', date: '2025-02-24T08:02:00Z' },
      { text: 'confusion with weird timing of these charges', author: 'Eva Jablow', date: '2025-02-24T08:03:00Z' },
      { text: 'sign off on a SOW for Avocado', author: 'Eva Jablow', date: '2025-02-24T08:03:00Z' },
    ] },
  { id: '1classpro', name: '1ClassPro', department: 'fitness', category: 'system',
    businessFunction: 'Swim Lesson Management',
    features: ['Aquatics Programs', 'Swim Lesson Registration & Management'],
    notes: ['Can integrate with MailChimp', 'No integration. Issue is getting billing/payment data.', 'Recurring billing, drag and drop registration, pro-rates billing for holidays/skipped classes, "make up token"', 'Team member (Jenny - retiring soon!!) exports registration reports once a month, manually creates billing records in Avo'],
    comments: [
      { text: 'have to manually charge people in Avocado, 80 hours a month (Jenny, who is retiring)', author: 'Eva Jablow', date: '2025-02-24T08:06:00Z' },
      { text: 'Because finance team does not want to use this as an additional POS', author: 'Eva Jablow', date: '2025-02-24T08:06:00Z' },
      { text: 'biggest program revenue - 1 million/yr', author: 'Eva Jablow', date: '2025-02-24T08:07:00Z' },
      { text: 'If charging in IClassPro, registrations don\'t make it into Avo', author: 'Hillary Dale', date: '2025-02-24T08:07:00Z' },
      { text: '29 hours/week now and basically sole responsibility is doing this billing', author: 'Hillary Dale', date: '2025-02-24T08:08:00Z' },
    ] },
  { id: 'team-sideline', name: 'Team Sideline', department: 'fitness', category: 'system',
    businessFunction: 'Sports Scheduling & Rosters',
    features: ['Sports Rosters', 'Basketball Roster Management', 'Team/Game Scheduling'],
    notes: ['Probably underutilized! But been in use 10+ years', 'Participants register in Avocado (rosters are here), Team Sideline is for scheduling', 'Team captains may have an account to access schedules, but otherwise JCC sends schedules to teams', 'Can integrate with Amilia'],
    comments: [
      { text: 'Has SMS included as part of sub but not using!', author: 'Hillary Dale', date: '2025-02-24T08:43:00Z' },
    ] },
  { id: 'whenIwork', name: 'WhenIWork', department: 'fitness', category: 'proposed',
    businessFunction: 'Staff Scheduling',
    features: ['Aquatics Scheduling'],
    notes: ['Has integration option with ADP', 'If integrated, could roll this out further and include time tracking!!'],
    comments: [
      { text: 'Scheduling manager is super powerful! Comms module, substitution management', author: 'Hillary Dale', date: '2025-02-25T10:21:00Z' },
      { text: 'Membership team & pre-school is using an excel for scheduling', author: 'Hillary Dale', date: '2025-02-25T10:21:00Z' },
    ] },

  // Finance/Accounting
  { id: 'thinsoft', name: 'Thinsoft', department: 'finance', category: 'system',
    businessFunction: 'Budget & Reporting',
    features: ['Historical Transactions', 'Budget Set Up', 'Historical Transactions & Budget Reporting'],
    notes: ['Budget prep package is paper-first (but can ask for Excel version)', 'Dir get budget/actual reports printed from Excel. About 1.5-2 months behind.', 'Capital expense = above a $ threshold and useful life — these requests are made on paper'],
    comments: [
      { text: 'Preference to see the budget in Thinsoft so set up here - TBC what Odoo can/can\'t do here', author: 'Hillary Dale', date: '2025-02-25T10:34:00Z' },
    ] },
  { id: 'odoo', name: 'Odoo', department: 'finance', category: 'system',
    businessFunction: 'General Ledger',
    features: ['General Ledger'],
    notes: ['Open API and Zapier options', 'Finance team is frustrated with Odoo', 'How is donation data getting into Odoo?'],
    comments: [
      { text: 'Implemented alongside Avocado, but selected under time pressure so didn\'t do a super robust exploration, probably cost was right', author: 'Hillary Dale', date: '2025-02-25T10:06:00Z' },
      { text: 'No one but finance works in here', author: 'Hillary Dale', date: '2025-02-25T10:06:00Z' },
      { text: 'Depts want to see their budgets in realtime', author: 'Eva Jablow', date: '2025-02-25T10:07:00Z' },
      { text: 'Haven\'t had a convo with Odoo rep - solutioning has been through Avo team', author: 'Hillary Dale', date: '2025-02-25T10:07:00Z' },
      { text: 'Think there is some POS capabilities, reporting, etc. - all underutilized', author: 'Hillary Dale', date: '2025-02-25T10:08:00Z' },
    ] },
  { id: 'concur', name: 'Concur', department: 'finance', category: 'system',
    businessFunction: 'Purchasing & Expenses',
    features: ['Expense Management', 'Purchasing/Expense Management', 'Accounts Payable'],
    notes: ['We were really behind on the tech front — just moving off of triplicate forms for purchase orders'],
    comments: [
      { text: 'Procurement started Nov \'25 - trained a few departments on some functionality, but not fully rolled out. Potential low adoption bc of distrust. Mandate for this was to improve PO process and stop using paper POs.', author: 'Hillary Dale', date: '2025-02-25T10:11:00Z' },
      { text: 'Request and expense modules. Shared company credit cards (request for expense submitted, approved by Dir supervisor, C-suite, Carol). Some purchasing thresholds with different approval levels.', author: 'Hillary Dale', date: '2025-02-25T10:11:00Z' },
      { text: 'Dave has been plugged in here to support with the implementation and training folks', author: 'Hillary Dale', date: '2025-02-25T10:11:00Z' },
      { text: 'Robin reconciles CC charges w/ PO/receipts - does this on a transaction-by-transaction basis with paper receipts to approve. Expense reports are submitted once a month, but finance wants to review in small bites', author: 'Hillary Dale', date: '2025-02-25T10:11:00Z' },
      { text: 'Not a strong attachment to this if there is another PO process', author: 'Hillary Dale', date: '2025-02-25T10:11:00Z' },
      { text: 'Policies on paper \'approve\' expenses, but to actually make the purchases they still require a lottt of paper and approvals, undermining policies on paper', author: 'Hillary Dale', date: '2025-02-25T10:11:00Z' },
      { text: 'Declined transactions, unpaid items, payment methods, scheduled purchases', author: 'Eva Jablow', date: '2025-02-25T10:30:00Z' },
      { text: 'Some membership reporting', author: 'Eva Jablow', date: '2025-02-25T10:30:00Z' },
      { text: 'What is/should be reported from here versus Odoo?', author: 'Hillary Dale', date: '2025-02-25T10:30:00Z' },
    ] },
  { id: 'adp', name: 'ADP', department: 'finance', category: 'system',
    businessFunction: 'HR & Payroll',
    features: ['HR/Payroll', 'Time Tracking'],
    notes: [],
    comments: [
      { text: 'Everyone who needs to clock in/out should be doing it on ADP!', author: 'Hillary Dale', date: '2025-02-25T10:25:00Z' },
      { text: 'Currently, managers are manually cross referencing ADP hours to schedules', author: 'Hillary Dale', date: '2025-02-25T10:25:00Z' },
      { text: 'Still using \'part-time payroll\' sheets for hours outside of ADP - these are for capturing hours outside of ADP. For example, someone is a salaried staff who contributes to other work like showing up on weekends for events - that time in the event is paid hourly and captured in the paper forms. Rate is different for these hours most often (or coming from different budget/cost center than their salary comes from)', author: 'Hillary Dale', date: '2025-02-25T10:25:00Z' },
      { text: 'Contractor payroll is also done on paper forms', author: 'Hillary Dale', date: '2025-02-25T10:25:00Z' },
      { text: 'This is probably pretty underutilized!! Ex. integration with WhenIWork', author: 'Hillary Dale', date: '2025-02-25T10:19:00Z' },
      { text: 'No complex scheduling, not enough for all of what we need (thus interest in WhenIWork)', author: 'Eva Jablow', date: '2025-02-25T10:22:00Z' },
      { text: 'Permissions need to be reviewed so Dep Dir have info they need', author: 'Hillary Dale', date: '2025-02-25T10:22:00Z' },
    ] },
  // Events & Activities
  { id: 'fmx', name: 'FMX', department: 'events', category: 'system',
    businessFunction: 'Facility Management',
    features: ['Room Reservations', 'Facility Management', 'Rentals', 'Work Orders'],
    notes: ['Possible integration with SF via Apiway'],
    comments: [
      { text: 'Went live mid-server crash!! about a month ago', author: 'Hillary Dale', date: '2025-02-25T10:37:00Z' },
      { text: 'Used to do work orders on \'Impact\'', author: 'Hillary Dale', date: '2025-02-25T10:37:00Z' },
      { text: 'Has POS capabilities but not using - can send invoices from FMX, but payment is manual', author: 'Hillary Dale', date: '2025-02-25T10:37:00Z' },
      { text: 'Can block space in Upace, schedule payment in Avocado for evening of or day after the rental', author: 'Eva Jablow', date: '2025-02-25T10:38:00Z' },
      { text: 'Wants to do the same in FMX - schedule for payment after event', author: 'Hillary Dale', date: '2025-02-25T10:38:00Z' },
      { text: 'Some bigger events do have installment payments', author: 'Hillary Dale', date: '2025-02-25T10:38:00Z' },
      { text: 'Most people are paying by check', author: 'Hillary Dale', date: '2025-02-25T10:38:00Z' },
      { text: 'No integration with UPace, so rentals are split', author: 'Hillary Dale', date: '2025-02-25T10:39:00Z' },
      { text: 'UPace works well for members who have access to reservations bc they are members - don\'t want to send members to FMX as another system to use. Ideally reservations across UPace and FMX are going to the same calendars.', author: 'Hillary Dale', date: '2025-02-25T10:39:00Z' },
    ] },
  { id: 'eventive', name: 'Eventive', department: 'events', category: 'system',
    businessFunction: 'Ticketed Events',
    features: ['Ticketed Events', 'Program Registration', 'Point of Sale'],
    notes: ['Zapier, Open API, MailChimp Integration'],
    comments: [
      { text: 'This was easier for finance to manage when it was just used for FilmFest; but now more teams are using. Revenue is coming in as a lump sum from Square. Finance team has a license, but they aren\'t setting programs up.', author: 'Hillary Dale', date: '2025-02-25T10:46:00Z' },
      { text: '+ Jbourhood', author: 'Hillary Dale', date: '2025-02-25T10:51:00Z' },
      { text: 'Not mission critical to sell specific ticketed seats, but mission critical to sell tickets and have easy scan/check in process', author: 'Hillary Dale', date: '2025-02-25T10:51:00Z' },
      { text: 'Non member registration more than anything', author: 'Eva Jablow', date: '2025-02-25T10:51:00Z' },
      { text: 'a lot of this ^ is coming from frustration and low comfort with Avo', author: 'Hillary Dale', date: '2025-02-25T10:51:00Z' },
    ] },
  { id: 'square', name: 'Square', department: 'events', category: 'system',
    businessFunction: 'Point of Sale',
    features: ['Point of Sale', 'Pool Cafe', 'Catering', 'Margot\'s Cafe'],
    notes: [],
    comments: [
      { text: 'All cafes and catering orders', author: 'Hillary Dale', date: '2025-02-25T10:52:00Z' },
      { text: 'Square site set up to take orders', author: 'Hillary Dale', date: '2025-02-25T10:52:00Z' },
      { text: 'Word is that latest Avo has a big POS update, will investigate and potentially make the switch if it works well enough', author: 'Hillary Dale', date: '2025-02-25T10:52:00Z' },
    ] },
  { id: 'crexendo', name: 'Crexendo', department: 'events', category: 'system',
    businessFunction: 'Phone System',
    features: ['Phone System'],
    notes: [],
    comments: [
      { text: 'Launched recently', author: 'Hillary Dale', date: '2025-02-25T10:57:00Z' },
      { text: 'Daniel has admin access', author: 'Hillary Dale', date: '2025-02-25T10:57:00Z' },
      { text: 'User friendly, sophisticated, app', author: 'Hillary Dale', date: '2025-02-25T10:57:00Z' },
      { text: '@Eva Jablow any integration options here, possibly for calls/\'interaction\' tracking?', author: 'Hillary Dale', date: '2025-02-25T10:57:00Z' },
      { text: 'Has an app that you can put on your phone. Definitely has more stuff we can use, need to dig in. Voicemail, AI assist, auto-attendants, etc.', author: 'Hillary Dale', date: '2025-02-25T10:57:00Z' },
      { text: 'Has SMS!', author: 'Hillary Dale', date: '2025-02-25T10:57:00Z' },
    ] },
  { id: 'relay', name: 'Relay', department: 'events', category: 'system',
    businessFunction: 'Walkie-Talkie Comms',
    features: ['Internal Communication Devices'],
    notes: ['SF Integration, also Zapier'],
    comments: [
      { text: 'Would love to make calls straight from SF!', author: 'Hillary Dale', date: '2025-02-25T11:00:00Z' },
      { text: 'Plus could be clutch if we want to start tracking interactions across org', author: 'Hillary Dale', date: '2025-02-25T11:00:00Z' },
    ] },
  { id: 'ab-auctions', name: 'AB Auctions', department: 'events', category: 'system',
    businessFunction: 'Auction Platform',
    features: ['Auction Hosting', 'Auction Platform for Fundraising'],
    notes: ['Don\'t see any integration options at present'],
    comments: [
      { text: 'Was mostly used for big fundraising gala, but moving away from that event model so not really using anymore', author: 'Hillary Dale', date: '2025-02-25T10:55:00Z' },
      { text: 'No real use for this right now!', author: 'Hillary Dale', date: '2025-02-25T10:55:00Z' },
    ] },
  { id: 'run-sign-up', name: 'Run Sign Up', department: 'events', category: 'system',
    businessFunction: 'Race Management',
    features: ['Annual Races Management', 'Registration', 'Bib Assignment'],
    notes: ['Zapier'],
    comments: [
      { text: 'Bagel Run, race-specific needs', author: 'Eva Jablow', date: '2025-02-25T10:55:00Z' },
      { text: 'used to be just our members, run by us', author: 'Eva Jablow', date: '2025-02-25T10:55:00Z' },
      { text: 'Now it\'s an official race, get over 1000 people now, draws in folks otherwise outside of the network', author: 'Eva Jablow', date: '2025-02-25T10:55:00Z' },
      { text: 'Could data be exported to put into SF?', author: 'Hillary Dale', date: '2025-02-25T10:56:00Z' },
      { text: 'TBD how valuable this data is actually', author: 'Hillary Dale', date: '2025-02-25T10:56:00Z' },
      { text: '& time tracking', author: 'Hillary Dale', date: '2025-02-25T10:56:00Z' },
    ] },

  // Development
  { id: 'gofundme', name: 'GoFundMe Pro', department: 'development', category: 'system',
    businessFunction: 'Online Donations',
    features: ['Annual Campaign', 'Online Donations', 'Process CC Donations'],
    notes: ['SF Integration', 'Integration with GFMP "coming soon"'],
    comments: [
      { text: 'Checks get entered via Avocado and entered here', author: 'Eva Jablow', date: '2025-02-25T10:02:00Z' },
      { text: 'Checks physically dropped at the bank. Some concern about check scanning having a fee, but TBC.', author: 'Hillary Dale', date: '2025-02-25T10:04:00Z' },
    ] },
  { id: 'chariot', name: 'Chariot', department: 'development', category: 'system',
    businessFunction: 'DAF Donations',
    features: ['DAF Donations'],
    notes: [],
    comments: [] },
  { id: 'excel-dev', name: 'Excel', department: 'development', category: 'system',
    businessFunction: 'Donation Tracking & CRM',
    features: ['Donation Tracker', 'Donation Database', 'CRM'],
    notes: ['How is donation data getting into Odoo?', 'We have not invested where we need to — we know we\'ll need to spend more money'],
    comments: [] },
  { id: 'wealthengine', name: 'WealthEngine', department: 'development', category: 'proposed',
    businessFunction: 'Prospect Research',
    features: ['Prospect Research', 'Wealth Screening'],
    notes: ['Referenced in taskforce doc as upcoming', 'Needs to show connection to Salesforce'],
    comments: [
      { text: '@Hillary Dale i think we\'re missing wealthengine here (named in the taskforce doc as upcoming right?)', author: 'Eva Jablow', date: '2025-01-23T12:08:00Z' },
      { text: 'and then how it connects to SF!', author: 'Eva Jablow', date: '2025-01-23T12:09:00Z' },
    ] },

  // Marketing
  { id: 'monday', name: 'Monday.com', department: 'marketing', category: 'system',
    businessFunction: 'Project Management',
    features: ['Project Management', 'Forms', 'SF Integration', 'Task Management & Marketing Requests', 'Org-wide Calendar from List Views'],
    notes: ['Marketing requests go into Monday.com', 'Sending the same info to Marketing that they just put into Avo — duplicate data entry'],
    comments: [
      { text: 'Not too much loyalty to Monday.com! But need a task management tool frfr', author: 'Hillary Dale', date: '2025-02-25T09:37:00Z' },
      { text: 'Paid licenses - exploring free nonprofit for CRM', author: 'Hillary Dale', date: '2025-02-25T09:37:00Z' },
      { text: 'Courtney is unofficial Admin of Monday - ask for her to send list of the forms set up in Monday', author: 'Hillary Dale', date: '2025-02-25T09:37:00Z' },
      { text: 'Also moving across the org', author: 'Hillary Dale', date: '2025-02-25T10:01:00Z' },
    ] },
  { id: 'formstack', name: 'Formstack', department: 'marketing', category: 'system',
    businessFunction: 'Forms & Applications',
    features: ['Forms', 'SF Integration', 'Application Forms and Processing'],
    notes: [],
    comments: [] },
  { id: 'flodesk', name: 'Flodesk', department: 'marketing', category: 'system',
    businessFunction: 'Email Marketing',
    features: ['Email Marketing', 'Contact List Segmentation', 'Marketing Emails'],
    notes: ['Replacing MailChimp', 'Currently just have one license'],
    comments: [
      { text: 'potentially solutions here though!', author: 'Eva Jablow', date: '2025-02-25T09:44:00Z' },
      { text: 'Currently just have one license', author: 'Hillary Dale', date: '2025-02-25T09:50:00Z' },
      { text: 'No strong attachment! Was more of a bandaid solution because of cost. A move back to MailChimp would be totally acceptable! (if we can control costs)', author: 'Hillary Dale', date: '2025-02-25T09:52:00Z' },
      { text: 'Ideally more folks across the organization can use Flodesk to send their email blasts', author: 'Hillary Dale', date: '2025-02-25T10:01:00Z' },
    ] },
  { id: 'mailchimp', name: 'MailChimp', department: 'marketing', category: 'deprecated',
    businessFunction: 'Email Marketing',
    features: ['Email Marketing', 'Contact List Segmentation', 'Marketing Emails'],
    notes: ['*Collecting but all in one', 'Licensing is an issue', 'Sunsetting but still in use', 'Sunsetting — transitioning to Flodesk'],
    comments: [
      { text: 'pricing was a dealbreaker', author: 'Eva Jablow', date: '2025-02-25T09:51:00Z' },
      { text: 'because of segmentation pricing', author: 'Hillary Dale', date: '2025-02-25T09:51:00Z' },
      { text: 'pay per list member rather than individual email address (very common issue)', author: 'Eva Jablow', date: '2025-02-25T09:51:00Z' },
    ] },
  { id: 'canva', name: 'Canva', department: 'marketing', category: 'system',
    businessFunction: 'Design & Assets',
    features: ['Marketing Asset Creation'],
    notes: ['Open API, Zapier'],
    comments: [
      { text: 'Could Canva host schedules and be embedded into website?', author: 'Hillary Dale', date: '2025-02-25T09:59:00Z' },
      { text: 'Non-marketing folks have Canva accounts to make assets if needed', author: 'Hillary Dale', date: '2025-02-25T10:01:00Z' },
    ] },
  { id: 'glass-media', name: 'Glass Media', department: 'marketing', category: 'system',
    businessFunction: 'Digital Signage',
    features: ['Marketing Screens'],
    notes: [],
    comments: [
      { text: 'pushing marketing content to TV screens across campus', author: 'Hillary Dale', date: '2025-02-25T09:58:00Z' },
    ] },
  { id: 'website', name: 'Website', department: 'marketing', category: 'system',
    businessFunction: 'Website CMS',
    features: ['Content Creation'],
    notes: [],
    comments: [
      { text: 'Working on integration with SF/Avo so website is updating automatically', author: 'Hillary Dale', date: '2025-02-25T09:58:00Z' },
    ] },
  { id: 'ai-agents', name: 'AI Agents', department: 'marketing', category: 'new-feature',
    businessFunction: 'Support Chatbots',
    features: ['External-facing Support Bot', 'Camp Programming Support Bot'],
    notes: ['Lives on website + camp website'],
    comments: [
      { text: 'We were supposed to scan for accuracy and make them better, never followed up', author: 'Eva Jablow', date: '2025-02-25T09:55:00Z' },
      { text: 'Not sure if it\'s helpful in current state', author: 'Eva Jablow', date: '2025-02-25T09:55:00Z' },
      { text: 'Developed by Ashley - CMO who is now external', author: 'Hillary Dale', date: '2025-02-25T09:56:00Z' },
    ] },

  // Shared
  { id: 'ms365', name: 'Microsoft 365 Online', department: 'shared', category: 'system',
    businessFunction: 'Productivity Suite',
    features: ['Email', 'Calendar', 'OneDrive', 'Excel, Word, PPT', 'Teams', 'Adobe (Marketing)'],
    notes: ['ERP label on board', 'As needed: Spotify & other similar apps'],
    comments: [] },
  { id: 'realtime-feedback', name: 'RealTime Feedback', department: 'membership', category: 'system',
    businessFunction: 'Member Feedback',
    features: ['Member Feedback'],
    notes: [],
    comments: [] },
];

export const integrations = [
  // Existing integrations
  { id: 'int-sf-upace', source: 'salesforce', target: 'upace', status: 'existing', label: 'One-way', notes: 'Ideal is 2-way!' },
  { id: 'int-sf-campdoc', source: 'salesforce', target: 'campdoc', status: 'manual', label: 'Manual bulk import' },
  { id: 'int-sf-storypark', source: 'salesforce', target: 'storypark', status: 'manual', label: 'Export registrations' },
  { id: 'int-sf-calendly', source: 'salesforce', target: 'calendly', status: 'potential', label: 'SF Integration' },
  { id: 'int-sf-gofundme', source: 'salesforce', target: 'gofundme', status: 'potential', label: 'SF Integration' },

  // Potential integrations
  { id: 'int-fmx-sf', source: 'fmx', target: 'salesforce', status: 'potential', label: 'Via Apiway' },
  { id: 'int-eventive-sf', source: 'eventive', target: 'salesforce', status: 'potential', label: 'Zapier / Open API' },
  { id: 'int-relay-sf', source: 'relay', target: 'salesforce', status: 'potential', label: 'SF Integration / Zapier' },
  { id: 'int-odoo-sf', source: 'odoo', target: 'salesforce', status: 'potential', label: 'Open API / Zapier' },
  { id: 'int-monday-sf', source: 'monday', target: 'salesforce', status: 'potential', label: 'SF Integration' },
  { id: 'int-formstack-sf', source: 'formstack', target: 'salesforce', status: 'potential', label: 'SF Integration' },

  // Existing tool connections
  { id: 'int-1class-mailchimp', source: '1classpro', target: 'mailchimp', status: 'potential', label: 'Can integrate' },
  { id: 'int-canva-zapier', source: 'canva', target: 'mailchimp', status: 'potential', label: 'Open API / Zapier' },
  { id: 'int-spivi-upace', source: 'spivi', target: 'upace', status: 'broken', label: 'Promised but never happened' },

  // WealthEngine potential integration
  { id: 'int-wealthengine-sf', source: 'wealthengine', target: 'salesforce', status: 'potential', label: 'Needs SF connection' },
];

/**
 * Merge API-exported comments into the static data.
 * Call this after running the Miro export script.
 */
export function mergeApiComments(apiData) {
  if (!apiData?.comments) return;

  // Map API comments to systems by matching item content
  for (const comment of apiData.comments) {
    const matchingItem = apiData.items?.find(i => i.id === comment.itemId);
    if (matchingItem) {
      const systemMatch = systems.find(s =>
        s.name.toLowerCase().includes(matchingItem.plainText?.toLowerCase() || '') ||
        matchingItem.plainText?.toLowerCase().includes(s.name.toLowerCase())
      );
      if (systemMatch) {
        systemMatch.comments.push({
          text: comment.text,
          author: comment.author,
          date: comment.createdAt,
        });
      }
    }
  }
}
