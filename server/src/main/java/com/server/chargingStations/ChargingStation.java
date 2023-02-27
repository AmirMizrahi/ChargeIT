package com.server.chargingStations;

import com.server.GeoLocation;
import org.springframework.data.mongodb.core.mapping.Document;

import com.google.zxing.WriterException;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
/*import java.awt.image.BufferedImage;*/
import java.util.UUID;

@Document(collection = "chargingStations")
public class ChargingStation {
    private final GeoLocation m_location;
    private final String m_owner;
    /*private final BufferedImage m_qrCodeImage;*/
    private Status e_status;
    private double m_pricePerVolt;

    public ChargingStation(GeoLocation location, String owner, double pricePerVolt) {
        m_location = location;
        m_owner = owner;
        /*m_qrCodeImage = generateQRCodeImage();*/
        e_status = Status.NOT_CHARGING;
        m_pricePerVolt = pricePerVolt;
    }

    public GeoLocation getLocation() {
        return m_location;
    }
    public String getOwner() {
        return m_owner;
    }
    public Status getStatus() {
        return e_status;
    }

    public void setStatus(Status status) {
        e_status = status;
    }

    public double getPricePerVolt() {
        return m_pricePerVolt;
    }

    public void setPricePerVolt(double pricePerVolt) { m_pricePerVolt = pricePerVolt; }

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

enum Status {
    CHARGING, NOT_CHARGING
}

    /*ChargingStation chargingStation = new ChargingStation(new GeoLocation(123, 123), "John", 0.15);
    BufferedImage qrCodeImage = chargingStation.getQRCodeImage();
    try {
        File output = new File("test");
        ImageIO.write(qrCodeImage, "png", output);
    } catch (IOException e) {
        e.printStackTrace();
    }*/