import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { useState } from 'react';
import { Search, Star, MapPin, Clock } from 'lucide-react-native';

interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  distance: string;
  priceRange: string;
  image: string;
  deliveryTime: string;
  splitEasePartner: boolean;
}

export default function RestaurantsScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [restaurants] = useState<Restaurant[]>([
    {
      id: '1',
      name: 'The Italian Corner',
      cuisine: 'Italian',
      rating: 4.8,
      distance: '0.5 mi',
      priceRange: '$$',
      image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=800',
      deliveryTime: '25-35 min',
      splitEasePartner: true,
    },
    {
      id: '2',
      name: 'Sakura Sushi',
      cuisine: 'Japanese',
      rating: 4.9,
      distance: '0.8 mi',
      priceRange: '$$$',
      image: 'https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?auto=compress&cs=tinysrgb&w=800',
      deliveryTime: '20-30 min',
      splitEasePartner: true,
    },
    {
      id: '3',
      name: 'Green Garden Cafe',
      cuisine: 'Healthy',
      rating: 4.6,
      distance: '1.2 mi',
      priceRange: '$',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
      deliveryTime: '15-25 min',
      splitEasePartner: false,
    },
    {
      id: '4',
      name: 'Spice Route',
      cuisine: 'Indian',
      rating: 4.7,
      distance: '2.1 mi',
      priceRange: '$$',
      image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=800',
      deliveryTime: '30-40 min',
      splitEasePartner: true,
    },
    {
      id: '5',
      name: 'Burger Junction',
      cuisine: 'American',
      rating: 4.4,
      distance: '0.3 mi',
      priceRange: '$',
      image: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=800',
      deliveryTime: '10-20 min',
      splitEasePartner: false,
    },
  ]);

  const filteredRestaurants = restaurants.filter(restaurant =>
    restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Restaurants</Text>
        <Text style={styles.subtitle}>Find your perfect dining spot</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#6b7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search restaurants or cuisine..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#6b7280"
          />
        </View>
      </View>

      {/* Partner Banner */}
      <View style={styles.bannerContainer}>
        <View style={styles.partnerBanner}>
          <Text style={styles.bannerTitle}>🎉 SplitEase Partners</Text>
          <Text style={styles.bannerSubtitle}>Get exclusive deals and seamless payments</Text>
        </View>
      </View>

      {/* Restaurants List */}
      <ScrollView style={styles.restaurantsList} showsVerticalScrollIndicator={false}>
        {filteredRestaurants.map((restaurant) => (
          <TouchableOpacity key={restaurant.id} style={styles.restaurantCard}>
            <Image source={{ uri: restaurant.image }} style={styles.restaurantImage} />
            
            {restaurant.splitEasePartner && (
              <View style={styles.partnerBadge}>
                <Text style={styles.partnerText}>Partner</Text>
              </View>
            )}
            
            <View style={styles.restaurantContent}>
              <View style={styles.restaurantHeader}>
                <Text style={styles.restaurantName}>{restaurant.name}</Text>
                <View style={styles.ratingContainer}>
                  <Star size={16} color="#F59E0B" fill="#F59E0B" />
                  <Text style={styles.rating}>{restaurant.rating}</Text>
                </View>
              </View>
              
              <Text style={styles.cuisine}>{restaurant.cuisine} • {restaurant.priceRange}</Text>
              
              <View style={styles.restaurantDetails}>
                <View style={styles.detailItem}>
                  <MapPin size={14} color="#6b7280" />
                  <Text style={styles.detailText}>{restaurant.distance}</Text>
                </View>
                
                <View style={styles.detailItem}>
                  <Clock size={14} color="#6b7280" />
                  <Text style={styles.detailText}>{restaurant.deliveryTime}</Text>
                </View>
              </View>
              
              {restaurant.splitEasePartner && (
                <View style={styles.partnerPerks}>
                  <Text style={styles.perksText}>✨ Instant QR payments • No service fees</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 64,
    paddingBottom: 24,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  searchContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#111827',
  },
  bannerContainer: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  partnerBanner: {
    backgroundColor: '#10B981',
    borderRadius: 12,
    padding: 16,
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  bannerSubtitle: {
    fontSize: 14,
    color: '#ffffff',
    opacity: 0.9,
  },
  restaurantsList: {
    flex: 1,
    paddingHorizontal: 24,
  },
  restaurantCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
    position: 'relative',
  },
  restaurantImage: {
    width: '100%',
    height: 140,
  },
  partnerBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#10B981',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  partnerText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
  restaurantContent: {
    padding: 16,
  },
  restaurantHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  restaurantName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: '#F59E0B',
    marginLeft: 4,
  },
  cuisine: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 12,
  },
  restaurantDetails: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  detailText: {
    fontSize: 12,
    color: '#6b7280',
    marginLeft: 4,
  },
  partnerPerks: {
    backgroundColor: '#f0f9f4',
    padding: 8,
    borderRadius: 8,
    marginTop: 4,
  },
  perksText: {
    fontSize: 12,
    color: '#10B981',
    fontWeight: '500',
  },
});