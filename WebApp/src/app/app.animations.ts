import {
    animate,
    keyframes,
    style,
    transition,
    trigger,
} from '@angular/animations'

export const fadeInAnimation = trigger('fadeInAnimation', [
    transition('* <=> *', [
        // Start with opacity 0
        style({ opacity: 0, transform: 'translateZ(0)' }),

        // Animate the opacity, starting with a hold at 0 and then gradually increasing
        animate(
            '300ms ease-in-out', // Total duration of the animation
            keyframes([
                style({ opacity: 0, offset: 0 }), // Stay at opacity 0 at the start
                style({ opacity: 0, offset: 0 }), // Hold opacity 0 for 200ms (20% of the total duration)
                style({ opacity: 0, offset: 0.2 }), // Start increasing opacity at 80% of the duration
                style({ opacity: 1, offset: 1 }), // Finish at full opacity
            ])
        ),
    ]),
])

export const slideDownError = trigger('slideDownError', [
    transition(':enter', [
        style({ transform: 'translateY(-100%)', opacity: 0 }), // Start above and invisible
        animate(
            '200ms ease-in',
            style({ transform: 'translateY(0)', opacity: 1 })
        ), // Slide down
    ]),
    transition(':leave', [
        animate(
            '200ms ease-out',
            style({ transform: 'translateY(-100%)', opacity: 0 })
        ), // Slide up
    ]),
])
