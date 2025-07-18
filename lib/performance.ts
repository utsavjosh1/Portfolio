export class PerformanceMonitor {
  private static readonly timers = new Map<string, number>();
  private static readonly DEFAULT_SLOW_PAGE_THRESHOLD = 3000;
  private static readonly DEFAULT_SLOW_QUERY_THRESHOLD = 1000;

  static startTimer(name: string): void {
    this.timers.set(name, performance.now());
  }

  static endTimer(name: string): number {
    const startTime = this.timers.get(name);
    if (!startTime) {
      console.warn(`Timer "${name}" was not started`);
      return 0;
    }
    
    const duration = performance.now() - startTime;
    this.timers.delete(name);
    
    if (this.isDevelopment()) {
      console.log(`⚡ ${name}: ${duration.toFixed(2)}ms`);
    }
    
    return duration;
  }

  static async measureAsync<T>(
    name: string, 
    fn: () => Promise<T>
  ): Promise<T> {
    this.startTimer(name);
    try {
      const result = await fn();
      this.endTimer(name);
      return result;
    } catch (error) {
      this.endTimer(name);
      throw error;
    }
  }

  static measure<T>(name: string, fn: () => T): T {
    this.startTimer(name);
    try {
      const result = fn();
      this.endTimer(name);
      return result;
    } catch (error) {
      this.endTimer(name);
      throw error;
    }
  }

  static logPageLoad(
    pageName: string, 
    duration: number, 
    threshold: number = this.DEFAULT_SLOW_PAGE_THRESHOLD
  ): void {
    if (this.isDevelopment()) {
      console.log(`📄 Page Load - ${pageName}: ${duration.toFixed(2)}ms`);
    }
    
    if (this.isProduction() && duration > threshold) {
      console.warn(`Slow page load detected - ${pageName}: ${duration.toFixed(2)}ms`);
    }
  }

  static logDatabaseQuery(
    queryName: string, 
    duration: number, 
    threshold: number = this.DEFAULT_SLOW_QUERY_THRESHOLD
  ): void {
    if (this.isDevelopment()) {
      console.log(`🗄️  DB Query - ${queryName}: ${duration.toFixed(2)}ms`);
    }
    
    if (duration > threshold) {
      console.warn(`Slow database query detected - ${queryName}: ${duration.toFixed(2)}ms`);
    }
  }

  static getActiveTimers(): string[] {
    return Array.from(this.timers.keys());
  }

  static clearTimer(name: string): boolean {
    return this.timers.delete(name);
  }

  static clearAllTimers(): void {
    this.timers.clear();
  }

  private static isDevelopment(): boolean {
    return process.env.NODE_ENV === 'development';
  }

  private static isProduction(): boolean {
    return process.env.NODE_ENV === 'production';
  }
}

// Type-safe decorator for measuring function performance
type AsyncFunction<TArgs extends readonly unknown[], TReturn> = 
  (...args: TArgs) => Promise<TReturn>;

type SyncFunction<TArgs extends readonly unknown[], TReturn> = 
  (...args: TArgs) => TReturn;

type MeasurableFunction<TArgs extends readonly unknown[], TReturn> = 
  AsyncFunction<TArgs, TReturn> | SyncFunction<TArgs, TReturn>;

export function measurePagePerformance(pageName: string) {
  return function <
    TArgs extends readonly unknown[], 
    TReturn
  >(
    target: MeasurableFunction<TArgs, TReturn>
  ): MeasurableFunction<TArgs, TReturn> {
    return ((...args: TArgs) => {
      const startTime = performance.now();
      
      try {
        const result = target(...args);
        
        // Handle both sync and async functions
        if (result instanceof Promise) {
          return result
            .then((resolvedResult) => {
              const duration = performance.now() - startTime;
              PerformanceMonitor.logPageLoad(pageName, duration);
              return resolvedResult;
            })
            .catch((error) => {
              const duration = performance.now() - startTime;
              PerformanceMonitor.logPageLoad(`${pageName} (Error)`, duration);
              throw error;
            });
        } else {
          const duration = performance.now() - startTime;
          PerformanceMonitor.logPageLoad(pageName, duration);
          return result;
        }
      } catch (error) {
        const duration = performance.now() - startTime;
        PerformanceMonitor.logPageLoad(`${pageName} (Error)`, duration);
        throw error;
      }
    }) as MeasurableFunction<TArgs, TReturn>;
  };
}

// Enhanced cache monitoring with configurable reporting intervals
export class CacheMonitor {
  private static hits = 0;
  private static misses = 0;
  private static readonly DEFAULT_REPORT_INTERVAL = 10;

  static recordHit(reportInterval: number = this.DEFAULT_REPORT_INTERVAL): void {
    this.hits++;
    this.logStats(reportInterval);
  }

  static recordMiss(reportInterval: number = this.DEFAULT_REPORT_INTERVAL): void {
    this.misses++;
    this.logStats(reportInterval);
  }

  static getStats(): CacheStats {
    const total = this.hits + this.misses;
    return {
      hits: this.hits,
      misses: this.misses,
      total,
      hitRate: total > 0 ? (this.hits / total) * 100 : 0
    };
  }

  static reset(): void {
    this.hits = 0;
    this.misses = 0;
  }

  static logCurrentStats(): void {
    const stats = this.getStats();
    console.log(`📊 Cache Statistics:`, {
      hits: stats.hits,
      misses: stats.misses,
      total: stats.total,
      hitRate: `${stats.hitRate.toFixed(1)}%`
    });
  }

  private static logStats(reportInterval: number): void {
    const total = this.hits + this.misses;
    if (total > 0 && total % reportInterval === 0) {
      const hitRate = (this.hits / total * 100).toFixed(1);
      console.log(`📊 Cache Hit Rate: ${hitRate}% (${this.hits}/${total})`);
    }
  }
}

// Type definitions
export interface CacheStats {
  hits: number;
  misses: number;
  total: number;
  hitRate: number;
}

export interface PerformanceMetrics {
  name: string;
  duration: number;
  timestamp: number;
  type: 'page' | 'query' | 'function';
}

// Additional utility class for performance metrics collection
export class MetricsCollector {
  private static readonly metrics: PerformanceMetrics[] = [];
  private static readonly MAX_METRICS_SIZE = 1000;

  static addMetric(metric: PerformanceMetrics): void {
    this.metrics.push(metric);
    
    // Prevent memory leaks by limiting stored metrics
    if (this.metrics.length > this.MAX_METRICS_SIZE) {
      this.metrics.shift();
    }
  }

  static getMetrics(type?: PerformanceMetrics['type']): PerformanceMetrics[] {
    return type 
      ? this.metrics.filter(metric => metric.type === type)
      : [...this.metrics];
  }

  static getAverageMetric(name: string): number {
    const relevantMetrics = this.metrics.filter(metric => metric.name === name);
    if (relevantMetrics.length === 0) return 0;
    
    const sum = relevantMetrics.reduce((acc, metric) => acc + metric.duration, 0);
    return sum / relevantMetrics.length;
  }

  static clearMetrics(): void {
    this.metrics.length = 0;
  }

  static getMetricsSummary(): Record<string, { count: number; average: number; min: number; max: number }> {
    const summary: Record<string, { count: number; average: number; min: number; max: number }> = {};
    
    this.metrics.forEach(metric => {
      if (!summary[metric.name]) {
        summary[metric.name] = {
          count: 0,
          average: 0,
          min: Infinity,
          max: -Infinity
        };
      }
      
      const stats = summary[metric.name];
      stats.count++;
      stats.min = Math.min(stats.min, metric.duration);
      stats.max = Math.max(stats.max, metric.duration);
    });
    
    // Calculate averages
    Object.keys(summary).forEach(name => {
      const relevantMetrics = this.metrics.filter(metric => metric.name === name);
      const sum = relevantMetrics.reduce((acc, metric) => acc + metric.duration, 0);
      summary[name].average = sum / relevantMetrics.length;
    });
    
    return summary;
  }
}