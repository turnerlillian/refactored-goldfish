// Accessibility utility functions
export const a11yUtils = {
  // Announce to screen readers
  announceToScreenReader: (message: string, priority: 'polite' | 'assertive' = 'polite') => {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    // Remove after announcement
    setTimeout(() => {
      document.body.removeChild(announcement);
    }, 1000);
  },
  
  // Focus management for dynamic content
  manageFocus: (element: HTMLElement | null) => {
    if (element) {
      element.focus();
      // Scroll into view if needed
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  },
  
  // Trap focus within a container (for modals, etc.)
  trapFocus: (container: HTMLElement) => {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
    
    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };
    
    container.addEventListener('keydown', handleTabKey);
    
    // Return cleanup function
    return () => {
      container.removeEventListener('keydown', handleTabKey);
    };
  },
  
  // Check if user prefers reduced motion
  prefersReducedMotion: () => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  },
  
  // Check if user prefers high contrast
  prefersHighContrast: () => {
    return window.matchMedia('(prefers-contrast: high)').matches;
  },
  
  // Generate accessible ID
  generateId: (prefix: string = 'a11y') => {
    return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
  },
  
  // Validate form accessibility
  validateFormAccessibility: (form: HTMLFormElement) => {
    const issues: string[] = [];
    
    // Check for labels
    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach((input: Element) => {
      const inputElement = input as HTMLInputElement;
      const id = inputElement.id;
      const name = inputElement.name;
      
      if (!id) {
        issues.push(`Input with name "${name}" missing ID attribute`);
      }
      
      const label = form.querySelector(`label[for="${id}"]`);
      const ariaLabel = inputElement.getAttribute('aria-label');
      const ariaLabelledBy = inputElement.getAttribute('aria-labelledby');
      
      if (!label && !ariaLabel && !ariaLabelledBy) {
        issues.push(`Input with ID "${id}" missing accessible label`);
      }
    });
    
    // Check for fieldsets and legends
    const fieldsets = form.querySelectorAll('fieldset');
    fieldsets.forEach((fieldset: Element) => {
      const legend = fieldset.querySelector('legend');
      if (!legend) {
        issues.push('Fieldset missing legend element');
      }
    });
    
    return issues;
  }
};

export default a11yUtils;