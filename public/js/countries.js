// Database quốc gia với cờ emoji và tên
const COUNTRIES = {
    'VN': { flag: '🇻🇳', name: 'Việt Nam', color: '#DA251D' },
    'US': { flag: '🇺🇸', name: 'USA', color: '#3C3B6E' },
    'BR': { flag: '🇧🇷', name: 'Brasil', color: '#009C3B' },
    'ID': { flag: '🇮🇩', name: 'Indonesia', color: '#CE1126' },
    'PH': { flag: '🇵🇭', name: 'Philippines', color: '#0038A8' },
    'TH': { flag: '🇹🇭', name: 'Thailand', color: '#A51931' },
    'MX': { flag: '🇲🇽', name: 'México', color: '#006847' },
    'JP': { flag: '🇯🇵', name: 'Japan', color: '#BC002D' },
    'KR': { flag: '🇰🇷', name: 'Korea', color: '#003478' },
    'GB': { flag: '🇬🇧', name: 'UK', color: '#012169' },
    'FR': { flag: '🇫🇷', name: 'France', color: '#002395' },
    'DE': { flag: '🇩🇪', name: 'Germany', color: '#DD0000' },
    'IN': { flag: '🇮🇳', name: 'India', color: '#FF9933' },
    'RU': { flag: '🇷🇺', name: 'Russia', color: '#0039A6' },
    'SA': { flag: '🇸🇦', name: 'Saudi Arabia', color: '#006C35' },
    'EG': { flag: '🇪🇬', name: 'Egypt', color: '#C8102E' },
    'TR': { flag: '🇹🇷', name: 'Türkiye', color: '#E30A17' },
    'NG': { flag: '🇳🇬', name: 'Nigeria', color: '#008751' },
    'AR': { flag: '🇦🇷', name: 'Argentina', color: '#74ACDF' },
    'CO': { flag: '🇨🇴', name: 'Colombia', color: '#FCD116' },
    'MY': { flag: '🇲🇾', name: 'Malaysia', color: '#010066' },
    'AU': { flag: '🇦🇺', name: 'Australia', color: '#00008B' },
    'CA': { flag: '🇨🇦', name: 'Canada', color: '#FF0000' },
    'IT': { flag: '🇮🇹', name: 'Italia', color: '#008C45' },
    'ES': { flag: '🇪🇸', name: 'España', color: '#AA151B' },
    'PK': { flag: '🇵🇰', name: 'Pakistan', color: '#01411C' },
    'BD': { flag: '🇧🇩', name: 'Bangladesh', color: '#006A4E' },
    'CN': { flag: '🇨🇳', name: 'China', color: '#DE2910' },
    'TW': { flag: '🇹🇼', name: 'Taiwan', color: '#000095' },
    'PE': { flag: '🇵🇪', name: 'Peru', color: '#D91023' },
    'CL': { flag: '🇨🇱', name: 'Chile', color: '#0039A6' },
};

function getCountryInfo(code) {
    return COUNTRIES[code] || { flag: '🏳️', name: 'Unknown', color: '#888888' };
}
