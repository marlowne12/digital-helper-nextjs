# TOOLS.md — Local Notes

Skills define *how* tools work. This file is for *your* specifics — the stuff unique to your setup.

## What Goes Here

- Camera names and locations
- SSH hosts and aliases
- Preferred voices for TTS
- Device nicknames
- API integration notes
- Script inventory

## Examples

```markdown
### Email
- Primary: you@example.com
- CLI: himalaya (IMAP/SMTP)

### TTS
- Preferred voice: George (warm British storyteller)
- Script: ./scripts/tts.sh "text" [voice_id]

### Cameras
- living-room → Main area, 180° wide angle
- front-door → Entrance, motion-triggered
```

## Why Separate?

Skills are shared. Your setup is yours. Keeping them apart means you can update skills without losing your notes, and share skills without leaking your infrastructure.

## API Keys

**Rule**: When stuck, `grep -i "KEYWORD" .env` before trying alternatives or asking your human for credentials.

---

Add whatever helps you do your job. This is your cheat sheet.
