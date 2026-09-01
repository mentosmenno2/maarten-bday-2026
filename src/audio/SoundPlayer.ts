import dialogUrl from '../assets/audio/dialog.mp3';
import logoffUrl from '../assets/audio/logoff.mp3';
import logonUrl from '../assets/audio/logon.mp3';
import minimizeUrl from '../assets/audio/minimize.mp3';
import recycleUrl from '../assets/audio/recycle.mp3';
import restoreUrl from '../assets/audio/restore.mp3';
import shutdownUrl from '../assets/audio/shutdown.mp3';
import startupUrl from '../assets/audio/startup.mp3';

export type SoundId = 'startup' | 'logon' | 'logoff' | 'shutdown' | 'minimize' | 'restore' | 'recycle' | 'dialog';

const soundUrls: Record<SoundId, string> = {
    startup: startupUrl,
    logon: logonUrl,
    logoff: logoffUrl,
    shutdown: shutdownUrl,
    minimize: minimizeUrl,
    restore: restoreUrl,
    recycle: recycleUrl,
    dialog: dialogUrl,
};

export function playSound(id: SoundId): void {
    const audio = new Audio(soundUrls[id]);

    // Browsers kunnen afspelen zonder gebruikersinteractie blokkeren; dit is geen fout.
    audio.play().catch(() => undefined);
}
