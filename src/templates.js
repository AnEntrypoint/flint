function tpl(id, name, category, imageUrl, linkPath) {
  return {
    id,
    name,
    category,
    description: `Community template on v0.dev`,
    previewImageUrl: imageUrl,
    v0Url: `https://v0.dev${linkPath}`,
  };
}

export const TEMPLATES = [
  tpl('t1', 'Optimus — AI platform to build and ship', 'AI', 'https://gvsmhepiuiax2e6y.public.blob.vercel-storage.com/templates/assets/ezgif-464bbe623ade3f56-nNnxi4IMwxHh8nXLULPHLdglqOwBsk.webp', '/templates/LHv4frpA7Us'),
  tpl('t2', 'Tasko — Modern Task Management Dashboard', 'Dashboards', 'https://gvsmhepiuiax2e6y.public.blob.vercel-storage.com/templates/assets/Screenshot-2026-01-17-at-11.47.11%E2%80%AFPM-xWghdBisESQU1iW8nWVRQTaYA1BmnS.jpg', '/templates/SGGKgsJdrxG'),
  tpl('t3', 'AGENTIC — Build & orchestrate AI agents', 'Agents', 'https://gvsmhepiuiax2e6y.public.blob.vercel-storage.com/templates/assets/ezgif-233ce88138c14d32-OW7FSnHsLmVYKwW7dEJxk2O1pF8J08.webp', '/templates/ugbOGUSE9MB'),
  tpl('t4', 'Brillance SaaS Landing Page', 'Landing Pages', 'https://gvsmhepiuiax2e6y.public.blob.vercel-storage.com/templates/assets/CleanShot%202025-09-15%20at%2008.35.08%402x-yc6PzoSg51q5wlOnRqRQUrAlC2Kyaq.png', '/templates/zdiN8dHwaaT'),
  tpl('t5', 'SalesOps Dashboard', 'Dashboards', 'https://gvsmhepiuiax2e6y.public.blob.vercel-storage.com/templates/assets/dashboard-oI046dr6pAxYcB3T5O2r8iY95gG51O.png', '/templates/9q2Mfgu6cDi'),
  tpl('t6', 'Modern Gen Z Energy Drink Landing Page', 'Landing Pages', 'https://gvsmhepiuiax2e6y.public.blob.vercel-storage.com/templates/assets/Screenshot%202026-01-16%20003055-7pRJv7MBUYTKzWIinCRdhhhQVpkaNw.png', '/templates/IQDdAvEEGsS'),
  tpl('t7', 'Shader Button', 'Components', 'https://gvsmhepiuiax2e6y.public.blob.vercel-storage.com/templates/assets/shader-button-2XNOQ5GXeXtgqxRacr7yr3YNPSp0p7.jpg', '/templates/QwoT8svq9DJ'),
  tpl('t8', '3D Liquid Metal Buttons', 'Components', 'https://gvsmhepiuiax2e6y.public.blob.vercel-storage.com/templates/assets/Screenshot%202025-12-22%20at%208.26.22%E2%80%AFPM-TZLGexza0LEHnzNO8Bcrr1O7wvYG7T.png', '/templates/Vssr1d0IIL2'),
  tpl('t9', 'Financial Dashboard', 'Dashboards', 'https://gvsmhepiuiax2e6y.public.blob.vercel-storage.com/templates/assets/Screenshot%202025-02-02%20at%2011.59.47%E2%80%AFAM-JeiQvFDVyzDHJ25ofDg2yidnXYcur9.png', '/templates/DuidKNEmCKf'),
  tpl('t10', 'Metallic Silver Border Card', 'Components', 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/screenshots/dpl_49nBWtZLfeFXBZxFLBABj96HwoAf-MaOJHtIElR8TkhMYitnTETk5IcS6iE.jpg', '/templates/FPle6SOomI6'),
  tpl('t11', 'Frosted Authentication Page', 'Components', 'https://gvsmhepiuiax2e6y.public.blob.vercel-storage.com/templates/assets/1920-YOfkbz1GrIO6WZR1yYtPR6ManNhaqw.jpg', '/templates/eboqyw0KGxu'),
  tpl('t12', 'Action Search Bar', 'Components', 'https://gvsmhepiuiax2e6y.public.blob.vercel-storage.com/templates/assets/Screenshot%202025-01-30%20at%2012.35.20%E2%80%AFPM-u8OaxB0Td9WxtGpHNLXmLzha5quvjH.png', '/templates/S3nMPSmpQzk'),
  tpl('t13', 'Currency Transfer Animation', 'Components', 'https://gvsmhepiuiax2e6y.public.blob.vercel-storage.com/templates/assets/Screenshot%202025-01-30%20at%2012.39.34%E2%80%AFPM-0omwgoiND8YqowZxq6NHAzpYrAx6MF.png', '/templates/n73Gg2FnJDF'),
  tpl('t14', 'Globe To Map Transform', 'Components', 'https://gvsmhepiuiax2e6y.public.blob.vercel-storage.com/templates/assets/Slide%2016_9%20-%205-54TEBSAuw3n3WPJPGdbFeOYE01RQRq.png', '/templates/99MAOQptgL3'),
  tpl('t15', 'Folders UI', 'Components', 'https://gvsmhepiuiax2e6y.public.blob.vercel-storage.com/templates/assets/Folders-BcIEzdDCwOnPIxefg1GfTvaRGF2ZZ2.png', '/templates/1w6b0ZtZeUK'),
  tpl('t16', 'Music Player Component', 'Components', 'https://gvsmhepiuiax2e6y.public.blob.vercel-storage.com/templates/assets/Screenshot%202025-10-11%20201532%20(1)-iuYgSqF4ua9oEBx9rk26soxH0TJUNr.png', '/templates/dNBIr19MEZl'),
  tpl('t17', 'Minimalist Card', 'Components', 'https://gvsmhepiuiax2e6y.public.blob.vercel-storage.com/templates/assets/Screenshot%202025-05-03%20at%202.18.29%E2%80%AFAM-6gwUitUBL4RqMa7wFlAzUBW3ZeFbHE.png', '/templates/G74jCSN5LYl'),
  tpl('t18', 'Wireframe Dot-matrix Globe', 'Components', 'https://gvsmhepiuiax2e6y.public.blob.vercel-storage.com/templates/assets/Slide%2016_9%20-%201-b3SEWqOcX25g2axmo8orRRLpcXltzI.png', '/templates/wPXObh787zg'),
  tpl('t19', 'Interactive Hero Section Animation', 'Components', 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/screenshots/dpl_FFouDYgY1P2nDFK7fWNMaZYrRWa3-ekI9Cv0aL9VLP6ezbKsm5HBlZtTuuu.jpg', '/templates/6O3cdBEOBJS'),
  tpl('t20', 'Mystery Box', 'Components', 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/screenshots/dpl_FFmYBkE4yjstPuLzd8cUA85p4yj5-nr5zWdoVRbha76z27Q0zraa5FSIj3x.jpg', '/templates/ysuFpwQvuGi'),
  tpl('t21', 'Calendar Kit', 'Components', 'https://gvsmhepiuiax2e6y.public.blob.vercel-storage.com/templates/assets/calendar-yesiDdlkvWEvje1QZyIXNVmL4ldXs5.jpg', '/templates/DMOiVXqR3yf'),
  tpl('t22', 'Frosted Glass UI — CRM Dashboard', 'Dashboards', 'https://gvsmhepiuiax2e6y.public.blob.vercel-storage.com/templates/assets/Screenshot%202025-08-15%20145302-X1jrhzKwHmX8ceLppx5oNZsd4laKlO.jpg', '/templates/SD8IPhg8bcC'),
  tpl('t23', 'Customer Success Management App', 'Dashboards', 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/screenshots/dpl_6GZLtAjpRacoSDokud5A68PKQFRF-3UkfEwUm7nmVwJpb13VlnZFP7Ntmef.jpg', '/templates/GjfM6W3LNhT'),
  tpl('t24', 'Shadcn Dashboard', 'Dashboards', 'https://gvsmhepiuiax2e6y.public.blob.vercel-storage.com/templates/assets/CleanShot%202025-08-05%20at%2013.12.35%402x-WG8PDViuMP5tAaDGjv8qHarFEYXGxs.png', '/templates/Pf7lw1nypu5'),
  tpl('t25', 'Pulse — Engineering Metrics Console', 'Dashboards', 'https://gvsmhepiuiax2e6y.public.blob.vercel-storage.com/templates/assets/Frame%201171275542-BpFYt5NdKORQIVEDdbwjrwg3rVevAs.jpg', '/templates/3hZwaLtyRbc'),
  tpl('t26', 'FinFlow Mobile & Web App UI', 'Dashboards', 'https://gvsmhepiuiax2e6y.public.blob.vercel-storage.com/templates/assets/Screenshot-2026-03-15-at-8.37.12%E2%80%AFPM-x9uGxEW8N9Z9aJTFuhYB9kA4ZHL70Z.jpg', '/templates/TdbdgFKSnpg'),
  tpl('t27', 'Ecommerce Analytics Dashboard', 'Dashboards', 'https://gvsmhepiuiax2e6y.public.blob.vercel-storage.com/templates/assets/Screenshot%202026-01-19%20190825-bbvNw00D1nREUgd3AzooV4oIgbi1Dd.png', '/templates/pd25Au2LhWp'),
  tpl('t28', 'Futuristic Dashboard', 'Dashboards', 'https://gvsmhepiuiax2e6y.public.blob.vercel-storage.com/templates/screenshots/ZAyrQvYVCUs-WZAsz70ACat2k3MrhfvgquyqcKe6AH.jpg', '/templates/ZAyrQvYVCUs'),
  tpl('t29', 'Stock Ticker Dashboard', 'Dashboards', 'https://gvsmhepiuiax2e6y.public.blob.vercel-storage.com/templates/assets/Screenshot%202025-12-11%20at%2018.58.21-fIE6gyyB5InlWINLdnPdo5ncLF4B2X.png', '/templates/JqfDUlSthgR'),
  tpl('t30', 'CMS Admin Dashboard', 'Dashboards', 'https://gvsmhepiuiax2e6y.public.blob.vercel-storage.com/templates/assets/bg-cms-Fi4JAwUMCsspEmeUcX8kA4aGoTn1WX.jpg', '/templates/d7j5B58dlp4'),
];

export const CATEGORIES = [...new Set(TEMPLATES.map((t) => t.category))];
