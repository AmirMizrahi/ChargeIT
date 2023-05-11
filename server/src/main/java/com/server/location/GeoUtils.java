package com.server.location;

public class GeoUtils {
    private static final double EARTH_RADIUS_KILOMETERS = 6371;

    public static double distanceBetweenPointsInKilometers(double lat1, double lon1, double lat2, double lon2) {
        double lat1Radians = Math.toRadians(lat1);
        double lat2Radians = Math.toRadians(lat2);
        double latDifferenceRadians = Math.toRadians(lat2 - lat1);
        double lonDifferenceRadians = Math.toRadians(lon2 - lon1);

        double a = Math.sin(latDifferenceRadians / 2) * Math.sin(latDifferenceRadians / 2)
                + Math.cos(lat1Radians) * Math.cos(lat2Radians)
                * Math.sin(lonDifferenceRadians / 2) * Math.sin(lonDifferenceRadians / 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        double distanceInKilometers = EARTH_RADIUS_KILOMETERS * c;

        return distanceInKilometers;
    }
}

