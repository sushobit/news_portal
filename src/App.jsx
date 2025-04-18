import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Switch,
  Container,
  Grid,
  ToggleButtonGroup,
  ToggleButton,
  Box,
  useMediaQuery,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import BusinessIcon from "@mui/icons-material/Business";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import ScienceIcon from "@mui/icons-material/Science";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import PublicIcon from "@mui/icons-material/Public";
import MovieIcon from "@mui/icons-material/Movie";
import MemoryIcon from "@mui/icons-material/Memory";
import axios from 'axios';
import logo from './logo.png';
import NewsCard from './components/NewsCard';
import { useTheme } from '@mui/material/styles';

const categoryKeywords = {
  general: { en: 'India', hi: 'भारत' },
  business: { en: 'business', hi: 'व्यवसाय' },
  entertainment: { en: 'movies', hi: 'मनोरंजन' },
  health: { en: 'health', hi: 'स्वास्थ्य' },
  science: { en: 'science', hi: 'विज्ञान' },
  sports: { en: 'sports', hi: 'खेल' },
  technology: { en: 'technology', hi: 'प्रौद्योगिकी' },
};

const categories = [
  { label: "General", value: "general", icon: <PublicIcon /> },
  { label: "Business", value: "business", icon: <BusinessIcon /> },
  { label: "Sports", value: "sports", icon: <SportsEsportsIcon /> },
  { label: "Health", value: "health", icon: <HealthAndSafetyIcon /> },
  { label: "Technology", value: "technology", icon: <MemoryIcon /> },
  { label: "Entertainment", value: "entertainment", icon: <MovieIcon /> },
  { label: "Science", value: "science", icon: <ScienceIcon /> },
];

const indianStates = [
  'Andhra Pradesh','Maharashtra', 'Delhi', 'Arunachal Pradesh', 'Gujarat', 'Madhya Pradesh',  'Assam',
  'Telangana', 'Bihar', 'Chhattisgarh', 'Punjab',
  'Goa','Haryana', 'Himachal Pradesh', 'Jharkhand', 'West Bengal', 'Karnataka', 'Kerala', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Rajasthan',
  'Sikkim', 'Tamil Nadu', 'Tripura', 'Uttar Pradesh',
  'Uttarakhand', 'Jammu and Kashmir'
];

function App() {
  const [articles, setArticles] = useState([]);
  const [language, setLanguage] = useState('hi');
  const [category, setCategory] = useState('general');
  const [loading, setLoading] = useState(false);
  const [selectedState, setSelectedState] = useState('');
  const [menuAnchor, setMenuAnchor] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));


  const fetchNews = async () => {
    setLoading(true);
    try {
      const categoryQuery = categoryKeywords[category][language];
      const query = selectedState ? `${categoryQuery} ${selectedState}` : categoryQuery;
      const apiKey = import.meta.env.VITE_NEWS_API_KEY;
  
      const res = await axios.get(
        `https://newsapi.org/v2/everything?q=${query}&language=${language}&sortBy=publishedAt&apiKey=${apiKey}`
      );
      setArticles(res.data.articles);
    } catch (err) {
      console.error('Error fetching news:', err);
    }
    setLoading(false);
  };
  

  useEffect(() => {
    fetchNews();
  }, [language, category, selectedState]);

  const handleLanguageToggle = () => {
    setLanguage((prev) => (prev === 'en' ? 'hi' : 'en'));
  };

  const handleCategoryChange = (event, newCategory) => {
    if (newCategory) {
      setCategory(newCategory);
    }
  };

  const openMenu = (e) => setMenuAnchor(e.currentTarget);
  const closeMenu = () => setMenuAnchor(null);

  const renderMobileMenu = (
    <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={closeMenu}>
      <MenuItem>
        <select
          value={selectedState}
          onChange={(e) => {
            setSelectedState(e.target.value);
            closeMenu();
          }}
          style={{
            width: '100%',
            padding: '6px 10px',
            borderRadius: 5,
            border: '1px solid #ccc',
            fontSize: '14px'
          }}
        >
          <option value="">All India</option>
          {indianStates.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </MenuItem>
      <MenuItem>
        <Switch checked={language === 'en'} onChange={handleLanguageToggle} />
        <Typography variant="body1" sx={{ ml: 1 }}>
          {language === 'hi' ? 'हिन्दी' : 'English'}
        </Typography>
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: 'white', padding: '10px' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box display="flex" alignItems="center">
            <a href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
              <img
                src={logo}
                alt="Logo"
                style={{ height: 70, marginRight: 10, borderRadius: 5 }}
              />
            </a>
          </Box>

          {!isMobile ? (
            <Box display="flex" alignItems="center" gap={2} color="black">
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                style={{
                  padding: '6px 10px',
                  borderRadius: 5,
                  border: '1px solid #ccc',
                  fontSize: '14px'
                }}
              >
                <option value="">All India</option>
                {indianStates.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              <Switch checked={language === 'en'} onChange={handleLanguageToggle} />
              <Typography variant="body1">
                {language === 'hi' ? 'हिन्दी' : 'English'}
              </Typography>
            </Box>
          ) : (
            <>
              <IconButton edge="end" onClick={openMenu}>
                <MenuIcon />
              </IconButton>
              {renderMobileMenu}
            </>
          )}
        </Toolbar>
      </AppBar>

      <Box sx={{ mt: 15, px: 2 }}>
        <ToggleButtonGroup
          value={category}
          exclusive
          onChange={handleCategoryChange}
          sx={{
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 1,
            mb: 3,
          }}
        >
          {categories.map(({ label, value, icon }) => (
            <ToggleButton
              value={value}
              key={value}
              sx={{
                px: 2,
                py: 1,
                textTransform: 'capitalize',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              {icon}
              {language === 'hi' ? categoryKeywords[value].hi : label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>

        {loading ? (
          <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            mt: 8,
            minHeight: '50vh',
          }}>
            <div className="news-globe">🌍</div>
            <div className="typewriter-text">Loading...</div>
          </Box>
        ) : articles.length === 0 ? (
          <Typography variant="h6" align="center" sx={{ mt: 5 }}>
            No news articles available for this category and language.
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {articles.map((article, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <NewsCard
                  title={article.title}
                  description={article.description}
                  urlToImage={article.urlToImage}
                  url={article.url}
                  source={article.source}
                  author={article.author}
                  publishedAt={article.publishedAt}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </>
  );
}

export default App;
