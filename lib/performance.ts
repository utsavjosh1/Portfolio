// Performance monitoring utility for tracking page loads and database queries

export class PerformanceMonitor {
  private static timers: Map<string, number> = new Map()

  static startTimer(name: string): void {
    this.timers.set(name, Date.now())
  }

  static endTimer(name: string): number {
    const startTime = this.timers.get(name)
    if (!startTime) {
      console.warn(`Timer ${name} was not started`)
      return 0
    }
    
    const duration = Date.now() - startTime
    this.timers.delete(name)
    
    // Log performance in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`⚡ ${name}: ${duration}ms`)
    }
    
    return duration
  }

  static async measureAsync<T>(name: string, fn: () => Promise<T>): Promise<T> {
    this.startTimer(name)
    try {
      const result = await fn()
      this.endTimer(name)
      return result
    } catch (error) {
      this.endTimer(name)
      throw error
    }
  }

  static logPageLoad(pageName: string, duration: number): void {
    if (process.env.NODE_ENV === 'development') {
      console.log(`📄 Page Load - ${pageName}: ${duration}ms`)
    }
    
    // In production, you could send this to analytics
    if (process.env.NODE_ENV === 'production' && duration > 3000) {
      console.warn(`Slow page load detected - ${pageName}: ${duration}ms`)
    }
  }

  static logDatabaseQuery(queryName: string, duration: number): void {
    if (process.env.NODE_ENV === 'development') {
      console.log(`🗄️  DB Query - ${queryName}: ${duration}ms`)
    }
    
    // Warn about slow queries
    if (duration > 1000) {
      console.warn(`Slow database query detected - ${queryName}: ${duration}ms`)
    }
  }
}

// Page performance measurement decorator
export function measurePagePerformance(pageName: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function <T extends (...args: any[]) => any>(target: T): T {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (async (...args: any[]) => {
      const startTime = Date.now()
      try {
        const result = await target(...args)
        const duration = Date.now() - startTime
        PerformanceMonitor.logPageLoad(pageName, duration)
        return result
      } catch (error) {
        const duration = Date.now() - startTime
        PerformanceMonitor.logPageLoad(`${pageName} (Error)`, duration)
        throw error
      }
    }) as T
  }
}

// Simple cache hit rate monitoring
export class CacheMonitor {
  private static hits: number = 0
  private static misses: number = 0

  static recordHit(): void {
    this.hits++
    this.logStats()
  }

  static recordMiss(): void {
    this.misses++
    this.logStats()
  }

  private static logStats(): void {
    const total = this.hits + this.misses
    if (total > 0 && total % 10 === 0) {
      const hitRate = (this.hits / total * 100).toFixed(1)
      console.log(`📊 Cache Hit Rate: ${hitRate}% (${this.hits}/${total})`)
    }
  }

  static getStats(): { hits: number; misses: number; hitRate: number } {
    const total = this.hits + this.misses
    return {
      hits: this.hits,
      misses: this.misses,
      hitRate: total > 0 ? (this.hits / total) * 100 : 0
    }
  }
} 