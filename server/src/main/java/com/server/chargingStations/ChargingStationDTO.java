package com.server.chargingStations;

import com.server.GeoLocation;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/*import java.awt.image.BufferedImage;*/

@Document(collection = "chargingStations")
public class ChargingStationDTO {
    @Id
    private final GeoLocation location;
    //private final ObjectId ownerId;
    /*private final BufferedImage m_qrCodeImage;*/
    private final EchargerType chargerType;
    private Estatus status;
    private double pricePerVolt;

    // TODO E - Add Reviews (list of strings?).

    public ChargingStationDTO(GeoLocation location, /*ObjectId ownerId,*/ double pricePerVolt, EchargerType chargerType) {
        this.location = location;
        //this.ownerId = ownerId;
        this.chargerType = chargerType;
        /*m_qrCodeImage = generateQRCodeImage();*/
        status = Estatus.NOT_CHARGING;
        this.pricePerVolt = pricePerVolt;
    }

    public GeoLocation getLocation() {
        return location;
    }
    /*public ObjectId getOwnerId() {
        return ownerId;
    }*/
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

    /*ChargingStation chargingStation = new ChargingStation(new GeoLocation(123, 123), "John", 0.15);
    BufferedImage qrCodeImage = chargingStation.getQRCodeImage();
    try {
        File output = new File("test");
        ImageIO.write(qrCodeImage, "png", output);
    } catch (IOException e) {
        e.printStackTrace();
    }*/