import { Injectable } from '@angular/core'

@Injectable()
export class DrawerContentService {
    scrollTo(scrollPosition: number): void {
        setTimeout(() => {
            const drawerContent: Element | null =
                document.getElementById('main')
            if (drawerContent) {
                drawerContent.scrollTo({
                    top: scrollPosition,
                    behavior: 'smooth', // Smooth scrolling
                })
            }
        }, 2)
    }

    scrollTop() {
        const drawerContent: HTMLElement | null =
            document.getElementById('main')
        const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)
        if (drawerContent) {
            if (isMobile) {
                drawerContent.style.overflow = 'hidden'
            }
        }
        setTimeout(() => {
            const drawerContent: HTMLElement | null =
                document.getElementById('main')
            if (drawerContent) {
                drawerContent.scrollTo({
                    top: 0,
                    left: 0,
                })
                if (isMobile) {
                    drawerContent.style.overflow = 'auto'
                }
            }
        }, 1)
    }

    scrollTopSmooth() {
        const drawerContent: HTMLElement | null =
            document.getElementById('main')
        const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)
        if (drawerContent) {
            if (isMobile) {
                drawerContent.style.overflow = 'hidden'
            }
        }
        setTimeout(() => {
            const drawerContent: HTMLElement | null =
                document.getElementById('main')
            if (drawerContent) {
                drawerContent.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'smooth',
                })
                if (isMobile) {
                    drawerContent.style.overflow = 'auto'
                }
            }
        }, 1)
    }

    scrollBy(y: number): void {
        setTimeout(() => {
            const drawerContent: Element | null =
                document.getElementById('main')
            if (drawerContent) {
                drawerContent.scrollBy({
                    top: y,
                    behavior: 'smooth',
                })
            }
        }, 1)
    }
}
