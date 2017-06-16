package io.acari.pojo;

import org.junit.Test;

import static org.junit.Assert.*;

/**
 * Forged in the flames of battle by alex.
 */
public class TranslatorTest {
    @Test
    public void setRequestsPerSecond() throws Exception {
        assertEquals(0, Translator.calculateTimeToWait(100));
    }
    @Test
    public void setRequestsPerSecond100() throws Exception {
        assertEquals(0, Translator.calculateTimeToWait(1000));
    }
    @Test
    public void setRequestsPerSecond_1() throws Exception {
        assertEquals(990, Translator.calculateTimeToWait(-1));
    }
    @Test
    public void setRequestsPerSecond_10() throws Exception {
        assertEquals(990, Translator.calculateTimeToWait(-10));
    }
    @Test
    public void setRequestsPerSecond1() throws Exception {
        assertEquals(990, Translator.calculateTimeToWait(1));
    }
    @Test
    public void setRequestsPerSecond2() throws Exception {
        assertEquals(490, Translator.calculateTimeToWait(2));
    }
    @Test
    public void setRequestsPerSecond10() throws Exception {
        assertEquals(90, Translator.calculateTimeToWait(10));
    }
    @Test
    public void setRequestsPerSecond99() throws Exception {
        assertEquals(1, Translator.calculateTimeToWait(99));

    }
    @Test
    public void setRequestsPerSecond50() throws Exception {
        assertEquals(10, Translator.calculateTimeToWait(50));
    }
}