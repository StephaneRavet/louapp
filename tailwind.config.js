/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'role-loup': 'var(--role-loup)',
        'role-village': 'var(--role-village)',
        'role-multi': 'var(--role-multi)',
        'role-independant': 'var(--role-independant)',
      }
    }
  },
  plugins: [],
}
