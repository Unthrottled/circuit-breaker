package io.acari.pojo;

import org.junit.Test;

import static org.junit.Assert.assertEquals;

/**
 * Forged in the flames of battle by alex.
 */
public class ThrottleParametersTest {
    @Test
    public void setRequestsPerSecond() throws Exception {
        ThrottleParameters throttleParameters = new ThrottleParameters();
        throttleParameters.setRequestsPerSecond(100);
        assertEquals(0, throttleParameters.calculateTimeToWait());
    }
    @Test
    public void setRequestsPerSecond100() throws Exception {
        ThrottleParameters throttleParameters = new ThrottleParameters();
        throttleParameters.setRequestsPerSecond(1000);
        assertEquals(0, throttleParameters.calculateTimeToWait());
    }
    @Test
    public void setRequestsPerSecond_1() throws Exception {
        ThrottleParameters throttleParameters = new ThrottleParameters();
        throttleParameters.setRequestsPerSecond(-1);
        assertEquals(990, throttleParameters.calculateTimeToWait());
    }
    @Test
    public void setRequestsPerSecond_10() throws Exception {
        ThrottleParameters throttleParameters = new ThrottleParameters();
        throttleParameters.setRequestsPerSecond(-10);
        assertEquals(990, throttleParameters.calculateTimeToWait());
    }
    @Test
    public void setRequestsPerSecond1() throws Exception {
        ThrottleParameters throttleParameters = new ThrottleParameters();
        throttleParameters.setRequestsPerSecond(1);
        assertEquals(990, throttleParameters.calculateTimeToWait());
    }
    @Test
    public void setRequestsPerSecond2() throws Exception {
        ThrottleParameters throttleParameters = new ThrottleParameters();
        throttleParameters.setRequestsPerSecond(2);
        assertEquals(490, throttleParameters.calculateTimeToWait());
    }
    @Test
    public void setRequestsPerSecond10() throws Exception {
        ThrottleParameters throttleParameters = new ThrottleParameters();
        throttleParameters.setRequestsPerSecond(10);
        assertEquals(90, throttleParameters.calculateTimeToWait());
    }
    @Test
    public void setRequestsPerSecond99() throws Exception {
        ThrottleParameters throttleParameters = new ThrottleParameters();
        throttleParameters.setRequestsPerSecond(99);
        assertEquals(1, throttleParameters.calculateTimeToWait());

    }
    @Test
    public void setRequestsPerSecond50() throws Exception {
        ThrottleParameters throttleParameters = new ThrottleParameters();
        throttleParameters.setRequestsPerSecond(50);
        assertEquals(10, throttleParameters.calculateTimeToWait());
    }

}