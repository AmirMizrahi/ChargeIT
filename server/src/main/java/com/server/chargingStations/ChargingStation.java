package com.server.chargingStations;

import com.server.location.GeoLocation;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/*import java.awt.image.BufferedImage;*/

@Document(collection = "chargingStations")
public class ChargingStation {
    @Id
    private ObjectId id;
    private final GeoLocation location;
    private final ObjectId ownerId;
    /*private final BufferedImage m_qrCodeImage;*/
    private final EchargerType chargerType;
    private Estatus status;
    private double pricePerVolt;
    private String stationName;

    // TODO E - Add Reviews (list of strings?).

    public ChargingStation(GeoLocation location, ObjectId ownerId, double pricePerVolt, EchargerType chargerType, String stationName) {
        this.location = location;
        this.ownerId = ownerId;
        this.chargerType = chargerType;
        /*m_qrCodeImage = generateQRCodeImage();*/
        status = Estatus.NOT_CHARGING;
        this.pricePerVolt = pricePerVolt;
        this.stationName = stationName;
    }

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public GeoLocation getLocation() {
        return location;
    }

    public ObjectId getOwnerId() {
        return ownerId;
    }

    public EchargerType getChargerType() {
        return chargerType;
    }

    public Estatus getStatus() {
        return status;
    }

    public void setStatus(Estatus status) {
        this.status = status;
    }

    public double getPricePerVolt() {
        return pricePerVolt;
    }

    public void setPricePerVolt(double pricePerVolt) { this.pricePerVolt = pricePerVolt; }

    public String getStationName() {
        return stationName;
    }

    public void setStationName(String stationName) {
        this.stationName = stationName;
    }

    public void charge()
    {
        status = Estatus.CHARGING;
    }

    public void unCharge()
    {
        status = Estatus.NOT_CHARGING;
    }

    /*public BufferedImage getQRCodeImage() {
        return m_qrCodeImage;
    }*/

    /*private BufferedImage generateQRCodeImage() {
        BufferedImage qrCodeImage = null;
        try {
            // Generate a unique ID for this charging station
            UUID stationId = UUID.randomUUID();

            // Generate the QR code
            QRCodeWriter qrCodeWriter = new QRCodeWriter();
            BitMatrix bitMatrix = qrCodeWriter.encode(stationId.toString(), com.google.zxing.BarcodeFormat.QR_CODE, 200, 200);

            // Convert the BitMatrix to a BufferedImage
            int width = bitMatrix.getWidth();
            int height = bitMatrix.getHeight();
            qrCodeImage = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);
            for (int x = 0; x < width; x++) {
                for (int y = 0; y < height; y++) {
                    int value = (bitMatrix.get(x, y) ? 0xFF000000 : 0xFFFFFFFF);
                    qrCodeImage.setRGB(x, y, value);
                }
            }
        } catch (WriterException e) {
            e.printStackTrace();
        }
        return qrCodeImage;
    }*/
}

enum Estatus {
    CHARGING, NOT_CHARGING
}

enum EchargerType {
    TYPE_0, TYPE_1
}

    /*ChargingStation chargingStation = new ChargingStation(new GeoLocation(123, 123), "John", 0.15);
    BufferedImage qrCodeImage = chargingStation.getQRCodeImage();
    try {
        File output = new File("test");
        ImageIO.write(qrCodeImage, "png", output);
    } catch (IOException e) {
        e.printStackTrace();
    }*/