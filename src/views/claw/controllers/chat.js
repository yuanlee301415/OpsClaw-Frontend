const SILENT_REPLY_PATTERN = /^\s*NO_REPLY\s*$/

export function isSilentReplyStream(text) {
  return SILENT_REPLY_PATTERN.test(text)
}
