/**
 * QR Code Integration Library - PNG Export Support
 * Generates QR codes and exports as PNG images
 * 
 * Usage: <script src="https://cdn.jsdelivr.net/npm/qrcodejs@1.0.0/qrcode.min.js"></script>
 *        <script src="qr-code-integration.js"></script>
 */
class QRCodeGenerator {
  constructor(containerId, options = {}) {
    this.containerId = containerId;
    this.options = {
      width: options.width || 200,
      height: options.height || 200,
      colorDark: options.colorDark || '#000000',
      colorLight: options.colorLight || '#ffffff',
      correctLevel: options.correctLevel || QRCode.CorrectLevel.H
    };
    this.qrcodeInstance = null;
    this.currentData = null;
  }
  generateForURL(url) {
    const fullURL = url.startsWith('http') ? url : `https://${url}`;
    return this.generate(fullURL);
  }
  generateForEmail(email) { return this.generate(`mailto:${email}`); }
  generateForPhone(phone) {
    const cleanPhone = phone.replace(/\s/g, '');
    return this.generate(`tel:${cleanPhone}`);
  }
  generateForText(text) { return this.generate(text); }
  generateForContact(contact) {
    const { name, phone, email, website, organization, title } = contact;
    const vcard = [
      'BEGIN:VCARD', 'VERSION:3.0',
      name ? `FN:${name}` : '',
      organization ? `ORG:${organization}` : '',
      title ? `TITLE:${title}` : '',
      phone ? `TEL:${phone.replace(/\s/g, '')}` : '',
      email ? `EMAIL:${email}` : '',
      website ? `URL:${website}` : '',
      'END:VCARD'
    ].filter(line => line).join('\n');
    return this.generate(vcard);
  }
  generate(data) {
    const container = document.getElementById(this.containerId);
    if (!container) { console.error(`Container "${this.containerId}" not found`); return null; }
    container.innerHTML = '';
    try {
      this.qrcodeInstance = new QRCode(container, {
        text: data, width: this.options.width, height: this.options.height,
        colorDark: this.options.colorDark, colorLight: this.options.colorLight,
        correctLevel: this.options.correctLevel
      });
      this.currentData = data;
      return this.qrcodeInstance;
    } catch (error) {
      console.error('Error generating QR code:', error);
      return null;
    }
  }
  download(filename = 'qrcode.png') {
    if (!this.qrcodeInstance) { console.error('No QR code generated'); return false; }
    const canvas = document.querySelector(`#${this.containerId} canvas`);
    if (!canvas) { console.error('Canvas not found'); return false; }
    try {
      const link = document.createElement('a');
      link.download = filename.endsWith('.png') ? filename : `${filename}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      return true;
    } catch (error) {
      console.error('Error downloading:', error);
      return false;
    }
  }
  getDataURL() {
    const canvas = document.querySelector(`#${this.containerId} canvas`);
    return canvas ? canvas.toDataURL('image/png') : null;
  }
  async copyToClipboard() {
    const canvas = document.querySelector(`#${this.containerId} canvas`);
    if (!canvas) return false;
    try {
      canvas.toBlob(async (blob) => {
        await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
      }, 'image/png');
      return true;
    } catch (error) {
      console.error('Error copying:', error);
      return false;
    }
  }
  updateSize(width, height = null) {
    this.options.width = width;
    this.options.height = height || width;
    if (this.currentData) this.generate(this.currentData);
  }
  updateColors(dark, light) {
    this.options.colorDark = dark;
    this.options.colorLight = light;
    if (this.currentData) this.generate(this.currentData);
  }
  clear() {
    const container = document.getElementById(this.containerId);
    if (container) container.innerHTML = '';
    this.qrcodeInstance = null;
    this.currentData = null;
  }
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = QRCodeGenerator;
}
