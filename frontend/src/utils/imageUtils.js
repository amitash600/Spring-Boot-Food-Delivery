// Image utility for fetching real restaurant and food images from Unsplash API

const UNSPLASH_ACCESS_KEY = "YOUR_UNSPLASH_ACCESS_KEY"; // You'll need to get this from unsplash.com

// Fallback images when API fails
const FALLBACK_RESTAURANT_IMAGES = [
  "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1552566626-52f8b828add9?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1522343546188-e5a8d4a75a0c?w=800&h=600&fit=crop",
];

const FALLBACK_FOOD_IMAGES = [
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1565958011703-44f9829ba846?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1504674900247-0877df31ccfa?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1563379091339-0316b2945c35?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=600&fit=crop",
  "https://images.unsplash.com/photo-1596797048536-4f294447b3e8?w=800&h=600&fit=crop",
];

// Cache for fetched images
const imageCache = new Map();

/**
 * Get a restaurant image based on restaurant name
 * @param {string} restaurantName - Name of the restaurant
 * @returns {string} Image URL
 */
export const getRestaurantImage = (restaurantName) => {
  const cacheKey = `restaurant_${restaurantName}`;

  if (imageCache.has(cacheKey)) {
    return imageCache.get(cacheKey);
  }

  // Generate a consistent image based on restaurant name
  const imageIndex =
    Math.abs(
      restaurantName
        .split("")
        .reduce((acc, char) => acc + char.charCodeAt(0), 0),
    ) % FALLBACK_RESTAURANT_IMAGES.length;
  const imageUrl = FALLBACK_RESTAURANT_IMAGES[imageIndex];

  imageCache.set(cacheKey, imageUrl);
  return imageUrl;
};

/**
 * Get a food image based on menu item name
 * @param {string} itemName - Name of the menu item
 * @returns {string} Image URL
 */
export const getFoodImage = (itemName) => {
  const cacheKey = `food_${itemName}`;

  if (imageCache.has(cacheKey)) {
    return imageCache.get(cacheKey);
  }

  // Smart food image selection based on keywords
  const lowerName = itemName.toLowerCase();
  let imageUrl;

  if (lowerName.includes("burger") || lowerName.includes("beef")) {
    imageUrl =
      "https://images.unsplash.com/photo-1568901346375-23c94598c5e7?w=800&h=600&fit=crop";
  } else if (lowerName.includes("pizza")) {
    imageUrl =
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=600&fit=crop";
  } else if (lowerName.includes("pasta") || lowerName.includes("spaghetti")) {
    imageUrl =
      "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&h=600&fit=crop";
  } else if (lowerName.includes("salad")) {
    imageUrl =
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=600&fit=crop";
  } else if (lowerName.includes("soup")) {
    imageUrl =
      "https://images.unsplash.com/photo-1547592166-3ac5d91dce34?w=800&h=600&fit=crop";
  } else if (lowerName.includes("sandwich")) {
    imageUrl =
      "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&h=600&fit=crop";
  } else if (lowerName.includes("chicken")) {
    imageUrl =
      "https://images.unsplash.com/photo-1626082927349-2cb297248d60?w=800&h=600&fit=crop";
  } else if (lowerName.includes("fish") || lowerName.includes("seafood")) {
    imageUrl =
      "https://images.unsplash.com/photo-1546833999-b6bf3a4b7cd9?w=800&h=600&fit=crop";
  } else if (lowerName.includes("rice") || lowerName.includes("biryani")) {
    imageUrl =
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&h=600&fit=crop";
  } else if (lowerName.includes("ice cream") || lowerName.includes("dessert")) {
    imageUrl =
      "https://images.unsplash.com/photo-1502751126162-b04e5cbed75a?w=800&h=600&fit=crop";
  } else if (lowerName.includes("coffee")) {
    imageUrl =
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop";
  } else if (lowerName.includes("juice") || lowerName.includes("drink")) {
    imageUrl =
      "https://images.unsplash.com/photo-1613478308226-a7a053794c38?w=800&h=600&fit=crop";
  } else if (lowerName.includes("taco")) {
    imageUrl =
      "https://images.unsplash.com/photo-1555042928-1e6e75b5e9b5?w=800&h=600&fit=crop";
  } else if (lowerName.includes("sushi")) {
    imageUrl =
      "https://images.unsplash.com/photo-1579584425054-d523d3ebd1eb?w=800&h=600&fit=crop";
  } else if (lowerName.includes("noodle")) {
    imageUrl =
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&h=600&fit=crop";
  } else {
    // Fallback to random food image
    const imageIndex =
      Math.abs(
        itemName.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0),
      ) % FALLBACK_FOOD_IMAGES.length;
    imageUrl = FALLBACK_FOOD_IMAGES[imageIndex];
  }

  imageCache.set(cacheKey, imageUrl);
  return imageUrl;
};

/**
 * Fetch image from Unsplash API (for future implementation with API key)
 * @param {string} query - Search query
 * @returns {Promise<string>} Image URL
 */
export const fetchUnsplashImage = async (query) => {
  if (
    !UNSPLASH_ACCESS_KEY ||
    UNSPLASH_ACCESS_KEY === "YOUR_UNSPLASH_ACCESS_KEY"
  ) {
    return getFoodImage(query);
  }

  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`,
      {
        headers: {
          Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
        },
      },
    );

    if (response.ok) {
      const data = await response.json();
      if (data.results.length > 0) {
        return data.results[0].urls.regular;
      }
    }
  } catch (error) {
    console.warn("Failed to fetch from Unsplash API:", error);
  }

  return getFoodImage(query);
};

/**
 * Preload images for better performance
 * @param {string[]} urls - Array of image URLs to preload
 */
export const preloadImages = (urls) => {
  urls.forEach((url) => {
    const img = new Image();
    img.src = url;
  });
};
