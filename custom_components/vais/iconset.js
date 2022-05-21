const vaisIcons = {
  vais: {
    path: 'd="M468.3,11.6c113.8-7.3,218.3,26,291.8,72.4c74.5,47,134.9,111.8,174.4,188.7c38.5,75,67.9,182.6,50.5,301.6c-11.4,77.9-39.3,140.3-76.8,196.3c-11.9,17.7-24.3,43.3-45,45c-19.9,1.6-35.9-11.3-38.4-30.7c-1.9-14.8,6.1-24.2,14.3-35.1c21.4-28.7,41.3-66.4,53.7-98.7c18-46.7,31.8-105.5,27.4-173.3C912,351.3,862.7,266.7,794,198c-34.6-34.6-77.9-62.3-121.7-82.3C625.8,94.6,575,81.3,506.6,78.5c-62.8-2.6-122.4,13.1-170,32.9C241.7,150.9,171.3,219.6,126,307.7c-23.1,44.9-40.2,95.5-45,157.9c-9.9,128.1,34.5,232.6,96.5,304.9c60.8,70.9,143.6,128.9,259.9,145.9c122.1,17.9,214.2-14.5,286.3-60.3c11.8-7.5,20.2-15.2,34-14.3c19.1,1.3,33.3,13.2,32.9,35.1c-0.4,20.2-18.1,31.3-32.9,40.6c-45.5,28.4-97.6,50.1-155.7,62.5c-84.5,18.1-187.2,8.3-255.6-14.3c-140-46.3-247.4-145.1-301.6-281.9C16.5,612.4,2.4,521.4,14.2,433.8c11.6-85.8,42.2-154,81.2-210.6c57.9-84.1,139.3-153.4,249-188.7C381.1,22.8,427.9,14.1,468.3,11.6z"/><path d="M720.5,359.2c-71.8,39.4-146.9,75.4-219.4,114.1c-74.3-45.2-147-92.1-220.5-138.2C350.3,297.9,424,259,493.5,225.4C570,269.2,643.7,315.8,720.5,359.2z"/><path d="M252.2,373.5c76,44.7,151.4,89.9,225.9,136c0,87.7,0,175.5,0,263.2c-4.9,1.2-9.4-3.2-13.2-5.5c-68.9-41.7-144.3-85.8-212.8-129.4C252.2,549.7,252.2,461.6,252.2,373.5z"/><path d="M745.8,658.7c-70.9,39.9-149,78.4-220.5,114.1c0-88.5,0-177,0-265.4c73.2-37.5,146.7-74.8,219.4-113C747.2,480.3,745,570.9,745.8,658.7z',
    keywords: ['vais', 'vioneta intergration store'],
  },
}

window.customIcons = window.customIcons || {}
window.customIconsets = window.customIconsets || {}

window.customIcons['vais'] = {
  getIcon: async (iconName) => ({ path: vaisIcons[iconName]?.path }),
  getIconList: async () =>
    Object.entries(vaisIcons).map(([icon, content]) => ({
      name: icon,
      keywords: content.keywords,
    })),
}
