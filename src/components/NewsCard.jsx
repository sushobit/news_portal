import { Card, CardContent, Typography, CardMedia, Box } from "@mui/material";

const NewsCard = ({
  title,
  description,
  urlToImage,
  url,
  source,
  author,
  publishedAt,
}) => {
  const formattedDate = publishedAt
    ? new Date(publishedAt).toLocaleString()
    : "Unknown date";

  return (
    <Card sx={{ m: 2, maxWidth: 345, display: "flex", flexDirection: "column", justifyContent: "space-between", borderRadius: '10px' }}>
      {urlToImage && (
        <CardMedia component="img" height="140" image={urlToImage} alt="News Image" />
      )}
      <CardContent>
        <Typography gutterBottom variant="h6">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Source:</strong> {source?.name || "Unknown"}
        </Typography>
        {author && (
          <Typography variant="body2" color="text.secondary">
            <strong>Author:</strong> {author}
          </Typography>
        )}
        <Typography variant="body2" color="text.secondary">
          <strong>Published:</strong> {formattedDate}
        </Typography>
        <Box mt={1}>
          <Typography variant="caption">
            <a href={url} target="_blank" rel="noopener noreferrer">
              Read more
            </a>
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default NewsCard;
