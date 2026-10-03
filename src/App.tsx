import { useState } from 'react'
import { CircleCheck, PackageCheck } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'

import { Button } from '@/components/ui/button'

function App() {
  const [confirmed, setConfirmed] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  return (
    <main className="grid min-h-svh place-items-center bg-background px-6 py-12 text-foreground">
      <motion.section
        aria-labelledby="setup-title"
        className="w-full max-w-xl space-y-8"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        <div className="space-y-3">
          <PackageCheck aria-hidden="true" className="size-8" strokeWidth={1.75} />
          <h1 id="setup-title" className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Coffee Shop POS
          </h1>
          <p className="max-w-md text-base leading-7 text-muted-foreground">
            React, Vite, shadcn/ui, Lucide, and Motion are ready for development.
          </p>
        </div>

        <Button
          type="button"
          size="lg"
          className="min-h-11 px-4"
          aria-pressed={confirmed}
          onClick={() => setConfirmed((current) => !current)}
        >
          <CircleCheck aria-hidden="true" data-icon="inline-start" />
          {confirmed ? 'Setup confirmed' : 'Verify setup'}
        </Button>
      </motion.section>
    </main>
  )
}

export default App
